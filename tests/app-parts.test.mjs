/* @layer tooling-scripts @kind test */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { run as check } from '../scripts/cli/check-command.mjs';
import { run as writeGuide } from '../scripts/cli/guide-command.mjs';
import { writeTree } from './config-fixture.mjs';
import { appUsageFixture } from './app-usage-fixture.mjs';

const TIMEOUT = 120_000;
const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]$/, '').split('\\').join('/');
const TSC = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
const PARTS_FILES = { root: 'packages/design/src/guide/parts.type.ts', app: 'apps/desktop/src/guide/parts.type.ts' };
const SHARED = 'packages/design/src/views';
const PLACES = ['.', 'apps/desktop', 'apps/web'];
const state = { split: '', shared: '' };
const read = (dir, path) => readFileSync(join(dir, path), 'utf8');
const files = (dir) => Object.values(PARTS_FILES).map((path) => read(dir, path));
const count = (text, word) => text.split(word).length - 1;
const view = (name) => `const ${name} = () => null;\n\nexport { ${name} };\n`;

const command = async (runIt, dir, place) => {
  const lines = [];
  const status = await runIt([], { cwd: join(dir, place), io: { log: (line) => lines.push(line), warn: (line) => lines.push(line) } });
  return { status, out: lines.join('\n') };
};

const checkEverywhere = async (dir) => {
  const results = [];
  for (const place of PLACES) results.push(await command(check, dir, place));
  return results;
};

const monorepo = async ({ views, apps }, tree) => {
  const { dir } = await appUsageFixture();
  const config = JSON.parse(read(dir, 'tessera.config.json'));
  const parts = { ...config.parts, views: views ?? config.parts.views };
  writeFileSync(join(dir, 'tessera.config.json'), JSON.stringify({ ...config, parts, guide: { ...config.guide, parts: PARTS_FILES.root }, apps: apps(config) }));
  writeTree(dir, { 'apps/web/package.json': { name: '@fixture/web', private: true }, 'apps/web/src/views/Shop/Shop.tsx': view('Shop'), ...tree });
  return dir;
};

beforeAll(async () => {
  state.split = await monorepo({
    apps: (config) => ({
      'apps/desktop': { ...config.apps['apps/desktop'], guide: { parts: PARTS_FILES.app } },
      'apps/web': { parts: { views: 'apps/web/src/views' } },
    }),
  });
  state.shared = await monorepo({
    views: [SHARED],
    apps: () => ({
      'apps/desktop': { parts: { views: [`./${SHARED}/`, 'apps/desktop/src/views'] }, guide: { parts: PARTS_FILES.app } },
      'apps/web': { parts: { views: [SHARED, 'apps/web/src/views', SHARED] } },
    }),
  }, { [`${SHARED}/Lobby/Lobby.tsx`]: view('Lobby') });
}, 2 * TIMEOUT);

afterAll(() => {
  for (const dir of Object.values(state)) rmSync(dir, { recursive: true, force: true });
});

describe('the parts modules of a monorepo with apps', () => {
  it('keeps each part folder in the parts file of the config that names it', async () => {
    await command(writeGuide, state.split, '.');
    const [root, app] = files(state.split);
    expect(root).toContain(['      parts:', "        | 'RunePanel'", "        | 'SaveSlot'", "        | 'Shop';"].join('\n'));
    expect(app).toContain(['      parts:', "        | 'BadView'", "        | 'Bare'", "        | 'Home'", "        | 'SaveList';"].join('\n'));
  }, TIMEOUT);

  it.each(PLACES.slice(0, 2))('writes from %s the files a run from the root writes, and tessera check passes from both places', async (place) => {
    const before = files(state.split);
    const written = await command(writeGuide, state.split, place);
    expect(files(state.split)).toEqual(before);
    expect(written.out).toContain(`tessera: wrote the part names to ${PARTS_FILES.root}.`);
    const results = await checkEverywhere(state.split);
    expect(results.map((result) => result.status)).toEqual([0, 0, 0]);
    for (const result of results) expect(result.out).not.toContain('parts-module');
  }, TIMEOUT);
});

describe('a views folder shared by the root and two apps', () => {
  it('lists its parts once, in the parts file of the root', async () => {
    expect((await command(writeGuide, state.shared, '.')).status).toBe(0);
    const [root, app] = files(state.shared);
    expect(count(root, "'Lobby'")).toBe(1);
    expect(root).toContain(['      parts:', "        | 'Lobby'", "        | 'RunePanel'", "        | 'SaveSlot'", "        | 'Shop';"].join('\n'));
    expect(app).not.toContain('Lobby');
  }, TIMEOUT);

  it.each(PLACES)('writes the same files from %s and counts the shared part once from every place', async (place) => {
    const before = files(state.shared);
    const written = await command(writeGuide, state.shared, place);
    expect(written.status).toBe(0);
    expect(files(state.shared)).toEqual(before);
    const results = await checkEverywhere(state.shared);
    expect(results.map((result) => result.status)).toEqual([0, 0, 0]);
    for (const result of [written, ...results]) {
      expect(result.out).not.toContain('duplicate-part');
      expect(result.out).not.toContain('parts-module');
      expect(count(result.out, 'Lobby')).toBe(1);
    }
  }, TIMEOUT);

  it('still flags two folders that hold a part of the same name', async () => {
    writeTree(state.shared, { 'apps/web/src/views/Lobby/Lobby.tsx': view('Lobby') });
    const [root, desktop, web] = await checkEverywhere(state.shared);
    const finding = `duplicate-part Lobby: Lobby names a part in ${SHARED}/Lobby and apps/web/src/views/Lobby; give each its own name`;
    expect(root.out).toContain(finding);
    expect(web.out).toContain(finding);
    expect(desktop.out).not.toContain('duplicate-part');
  }, TIMEOUT);
});

describe('a parts file on its own', () => {
  const tscErrors = (dir, project) => spawnSync(process.execPath, [TSC, '--noEmit', '-p', project], { cwd: dir, encoding: 'utf8' }).stdout
    .split('\n').filter((line) => line.includes('error TS'));

  it('imports the package first, so it type-checks in an app that imports only a subpath', async () => {
    await command(writeGuide, state.split, '.');
    expect(read(state.split, PARTS_FILES.app).split('\n').slice(0, 4)).toEqual([
      '/* @layer renderer-app @kind types */', "import type {} from '@drizztdourden08/tessera';", '', "declare module '@drizztdourden08/tessera' {",
    ]);
    writeTree(state.split, {
      'apps/desktop/src/subpath.ts': "export * from '@drizztdourden08/tessera/composites';\n",
      'apps/desktop/tsconfig.parts.json': { extends: './tsconfig.json', include: ['src/guide/parts.type.ts', 'src/subpath.ts', `${ROOT}/types/**/*`] },
    });
    expect(tscErrors(join(state.split, 'apps/desktop'), 'tsconfig.parts.json')).toEqual([]);
    rmSync(join(state.split, 'apps/desktop/src/subpath.ts'));
  }, TIMEOUT);

  it('lists no parts once a scope has none, and tessera check passes', async () => {
    const file = join(state.split, 'tessera.config.json');
    const original = read(state.split, 'tessera.config.json');
    const config = JSON.parse(original);
    mkdirSync(join(state.split, 'apps/desktop/src/no-views'), { recursive: true });
    const apps = { ...config.apps, 'apps/desktop': { ...config.apps['apps/desktop'], parts: { views: 'apps/desktop/src/no-views' } } };
    writeFileSync(file, JSON.stringify({ ...config, apps }));
    try {
      expect(read(state.split, PARTS_FILES.app)).toContain("'Home'");
      expect((await command(writeGuide, state.split, '.')).status).toBe(0);
      expect(read(state.split, PARTS_FILES.app)).toContain(["    '@fixture/desktop': {", '      parts: never;', '    };'].join('\n'));
      const results = await checkEverywhere(state.split);
      expect(results.map((result) => result.status)).toEqual([0, 0, 0]);
      for (const result of results) expect(result.out).not.toContain('parts-module');
    } finally {
      writeFileSync(file, original);
    }
  }, TIMEOUT);
});
