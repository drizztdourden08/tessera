/* @layer tooling-scripts @kind test */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { findTesseraConfig, loadTesseraConfig } from '../scripts/config/index.mjs';
import { posixPath } from '../scripts/config/posix-path.mjs';
import { CONFIG, fixtureRepo, MONOREPO, WORKSPACES_CONFIG } from './config-fixture.mjs';

const ROOT = posixPath(fileURLToPath(new URL('..', import.meta.url))).replace(/\/$/, '');
const made = [];
const repo = (files) => {
  const dir = fixtureRepo(files);
  made.push(dir);
  return dir;
};
const single = (config) => repo({ 'tessera.config.json': typeof config === 'string' ? config : JSON.stringify(config) });
const errorOf = (dir) => {
  try {
    loadTesseraConfig(dir);
    return '';
  } catch (error) {
    return error.message;
  }
};

afterAll(() => {
  for (const dir of made) rmSync(dir, { recursive: true, force: true });
});

describe('finding tessera.config.json', () => {
  it('walks up from a nested folder and takes the first file it meets', () => {
    const dir = repo();
    mkdirSync(join(dir, 'apps/desktop/src/deep/er'), { recursive: true });
    expect(findTesseraConfig(join(dir, 'apps/desktop/src/deep/er'))).toBe(`${dir}/tessera.config.json`);
    writeFileSync(join(dir, 'apps/desktop/tessera.config.json'), '{}');
    expect(findTesseraConfig(join(dir, 'apps/desktop/src/deep/er'))).toBe(`${dir}/apps/desktop/tessera.config.json`);
    expect(loadTesseraConfig(join(dir, 'apps/desktop/src')).root).toBe(`${dir}/apps/desktop`);
  });

  it('stops at the top of the repo, a .git folder or pnpm-workspace.yaml', () => {
    const dir = repo();
    mkdirSync(join(dir, 'nested/.git'), { recursive: true });
    mkdirSync(join(dir, 'nested/app/src'), { recursive: true });
    expect(findTesseraConfig(join(dir, 'nested/app/src'))).toBeUndefined();
  });

  it('gives undefined when no file is found', () => {
    const dir = repo({ 'package.json': '{}' });
    expect(findTesseraConfig(dir)).toBeUndefined();
    expect(loadTesseraConfig(dir)).toBeUndefined();
  });

  it('reads the Tessera repo config', () => {
    const config = loadTesseraConfig(join(ROOT, 'src/primitives/Box'));
    expect(config.root).toBe(ROOT);
    expect(config.parts.primitives).toEqual([`${ROOT}/src/primitives`]);
    expect(config.parts.composites).toEqual([`${ROOT}/src/composites`]);
    expect(config.stories).toBe(`${ROOT}/stories`);
    expect(config.guide.usage).toBe('report');
  });
});

describe('the resolved config', () => {
  it('fills the defaults, as absolute paths, for a file with only $schema', () => {
    const dir = single({ $schema: CONFIG.$schema });
    expect(loadTesseraConfig(dir)).toEqual({
      file: `${dir}/tessera.config.json`,
      root: dir,
      parts: {
        primitives: [`${dir}/src/primitives`],
        composites: [`${dir}/src/composites`],
        compounds: [`${dir}/src/compounds`],
        views: [`${dir}/src/views`],
      },
      layer: 'renderer-app',
      stories: `${dir}/stories`,
      theme: { css: `${dir}/src/theme.css` },
      guide: { usage: 'report', out: `${dir}/guide` },
      apps: [],
    });
  });

  it('resolves every path the file sets, relative to the file', () => {
    const dir = repo();
    const config = loadTesseraConfig(dir);
    expect(config.package).toBe('@fixture/design');
    expect(config.app).toBeUndefined();
    expect(config.parts.compounds).toEqual([`${dir}/packages/design/src/compounds`, `${dir}/packages/design/src/panels`]);
    expect(config.parts.views).toEqual([`${dir}/src/views`]);
    expect(config.theme).toEqual({ css: `${dir}/packages/design/src/theme.css`, palette: 'fixture' });
    expect(config.guide).toEqual({ usage: 'report', out: `${dir}/guide`, tree: `${dir}/packages/design/src/guide/tree.ts` });
    expect(config.gallery).toEqual({ title: 'Fixture', port: 4410, review: `${dir}/packages/design/review.json` });
    expect(config.overrides).toBe(`${dir}/packages/design/src/tessera-overrides.ts`);
    expect(config.apps).toEqual([`${dir}/apps/desktop`]);
  });

  it('merges the apps entry the folder sits in, and only inside it', () => {
    const dir = repo();
    const app = loadTesseraConfig(join(dir, 'apps/desktop/src'));
    expect(app.app).toBe(`${dir}/apps/desktop`);
    expect(app.parts.views).toEqual([`${dir}/apps/desktop/src/views`]);
    expect(app.parts.compounds).toEqual(loadTesseraConfig(dir).parts.compounds);
    expect(app.theme.palette).toBe('fixture');
    expect(loadTesseraConfig(join(dir, 'packages/design')).app).toBeUndefined();
  });

  it('takes the default views and theme of an app from its own folder', () => {
    const dir = repo();
    writeFileSync(join(dir, 'tessera.config.json'), JSON.stringify({ apps: { 'apps/web': {} } }));
    const app = loadTesseraConfig(join(dir, 'apps/web'));
    expect(app.parts.views).toEqual([`${dir}/apps/web/src/views`]);
    expect(app.theme.css).toBe(`${dir}/apps/web/src/theme.css`);
    expect(app.parts.compounds).toEqual([`${dir}/src/compounds`]);
  });

  it('takes the layer of the file, and the layer of an app inside its apps entry', () => {
    const dir = repo({ ...MONOREPO, 'tessera.config.json': WORKSPACES_CONFIG });
    expect(loadTesseraConfig(dir).layer).toBe('renderer-shell');
    expect(loadTesseraConfig(join(dir, 'packages/input')).layer).toBe('renderer-shell');
    expect(loadTesseraConfig(join(dir, 'apps/desktop/src')).layer).toBe('renderer-desktop');
  });
});

describe('a broken tessera.config.json', () => {
  it('names an unknown key, with the keys it takes', () => {
    expect(errorOf(single({ colours: {} }))).toContain('unknown key "colours"; the top keys are $schema, package, parts');
    expect(errorOf(single({ parts: { widgets: 'src/widgets' } }))).toContain('unknown key "parts.widgets"; the keys of "parts" are primitives, composites, compounds, views');
    expect(errorOf(single({ apps: { 'apps/web': { package: '@x/y' } } }))).toContain('unknown key "apps[\'apps/web\'].package"');
  });

  it('names a key of the wrong type or value', () => {
    expect(errorOf(single({ gallery: { port: '4410' } }))).toContain('"gallery.port" is a string; it takes a whole number');
    expect(errorOf(single({ guide: { usage: 'loose' } }))).toContain('"guide.usage" is "loose"; it takes "report" or "enforce"');
    expect(errorOf(single({ parts: { views: ['src/views', 3] } }))).toContain('"parts.views[1]" is a whole number; it takes a string');
    expect(errorOf(single({ parts: { views: 3 } }))).toContain('"parts.views" is a whole number; it takes a string or a list');
    expect(errorOf(single({ stories: '' }))).toContain('"stories" is empty');
    expect(errorOf(single({ layer: 'Renderer Shell' }))).toContain('"layer" is "Renderer Shell"; it takes text that matches');
    expect(errorOf(single({ apps: { 'apps/web': { layer: 'renderer_web' } } }))).toContain('"apps[\'apps/web\'].layer" is "renderer_web"');
    expect(errorOf(single([]))).toContain('the file is a list; it takes an object');
  });

  it('names the file, and says when it is not JSON', () => {
    const dir = single('{ "parts": ');
    expect(errorOf(dir)).toContain(`${dir}/tessera.config.json: not valid JSON.`);
  });
});
