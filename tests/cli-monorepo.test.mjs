/* @layer tooling-scripts @kind test */
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { runNew, slopIn } from './cli-sandbox.mjs';
import { fixtureRepo, MONOREPO, WORKSPACES_CONFIG } from './config-fixture.mjs';

const state = { dir: '', results: {} };
const read = (path) => readFileSync(join(state.dir, path), 'utf8');
const has = (path) => existsSync(join(state.dir, path));
const at = (path) => join(state.dir, path);

beforeAll(async () => {
  state.dir = fixtureRepo();
  state.results.view = await runNew(at('apps/desktop/src'), ['view', 'SaveList', '--group', 'Saves']);
  state.results.compound = await runNew(at('apps/desktop'), ['compound', 'SaveSlot']);
  state.results.into = await runNew(state.dir, ['compound', 'RunePanel', '--into', 'packages/design/src/panels']);
  state.results.primitive = await runNew(at('apps/desktop'), ['primitive', 'HelpWebview', '--yes']);
  state.results.rootView = await runNew(state.dir, ['view', 'Home']);
});

afterAll(() => rmSync(state.dir, { recursive: true, force: true }));

describe('tessera new in a monorepo with tessera.config.json', () => {
  it('writes a view into the parts.views of the app it runs in', () => {
    expect(state.results.view.status).toBe(0);
    expect(has('apps/desktop/src/views/SaveList/SaveList.tsx')).toBe(true);
    expect(has('apps/desktop/src/views/SaveList/SaveList.usage.ts')).toBe(true);
    expect(state.results.view.out).toContain('  apps/desktop/src/views/SaveList/SaveList.tsx');
    expect(state.results.view.out).not.toContain('no tessera.config.json');
  });

  it('writes the shared parts into the design package, with a story in its stories folder', () => {
    expect(state.results.compound.status).toBe(0);
    expect(has('packages/design/src/compounds/SaveSlot/index.ts')).toBe(true);
    expect(read('packages/design/stories/compounds/SaveSlot.stories.tsx')).toContain('import { SaveSlot } from \'../../src/compounds/SaveSlot\';');
    expect(read('packages/design/stories/views/SaveList.stories.tsx')).toContain('import { SaveList } from \'../../../../apps/desktop/src/views/SaveList\';');
    expect(state.results.primitive.status).toBe(0);
    expect(has('packages/design/src/primitives/HelpWebview/HelpWebview.tsx')).toBe(true);
  });

  it('shows the design package import in the usage example of a shared part', () => {
    expect(read('packages/design/src/compounds/SaveSlot/SaveSlot.usage.ts')).toContain('import { SaveSlot } from \'@fixture/design\';');
    expect(read('apps/desktop/src/views/SaveList/SaveList.usage.ts')).toContain('import { SaveList } from \'../SaveList\';');
  });

  it('takes the first folder of a list, or the one --into names', () => {
    expect(state.results.into.status).toBe(0);
    expect(has('packages/design/src/panels/RunePanel/RunePanel.tsx')).toBe(true);
    expect(has('packages/design/src/compounds/RunePanel')).toBe(false);
  });

  it('uses the root settings outside every app', () => {
    expect(state.results.rootView.status).toBe(0);
    expect(has('src/views/Home/Home.tsx')).toBe(true);
  });

  it('refuses a name taken in any parts folder, and an --into that is not listed', async () => {
    const taken = await runNew(at('apps/desktop'), ['view', 'SaveSlot']);
    expect(taken.status).toBe(1);
    expect(taken.out).toContain('packages/design/src/compounds/SaveSlot already exists');
    const elsewhere = await runNew(state.dir, ['compound', 'GameFrame', '--into', 'src/elsewhere']);
    expect(elsewhere.out).toContain('--into src/elsewhere is not one of the compound folders in tessera.config.json: packages/design/src/compounds, packages/design/src/panels');
    expect([...Object.values(state.results), taken, elsewhere].flatMap((result) => slopIn(result.out))).toEqual([]);
  });
});

describe('tessera new across workspace packages, with no package key', () => {
  const ws = { dir: '', results: {} };
  const wsRead = (path) => readFileSync(join(ws.dir, path), 'utf8');
  const wsHas = (path) => existsSync(join(ws.dir, path));
  const ROOT_MANIFEST = { name: 'fixture-root', private: true, devDependencies: { '@drizztdourden08/tessera': '^0.6.0', '@storylite/storylite': '^1.6.0' } };

  beforeAll(async () => {
    ws.dir = fixtureRepo({ ...MONOREPO, 'tessera.config.json': WORKSPACES_CONFIG, 'package.json': ROOT_MANIFEST });
    ws.results.dial = await runNew(ws.dir, ['composite', 'StickDial', '--into', 'packages/input/src/renderer/composites', '--yes']);
    ws.results.slot = await runNew(ws.dir, ['compound', 'SaveSlot']);
    ws.results.view = await runNew(join(ws.dir, 'apps/desktop'), ['view', 'SaveList']);
    ws.results.flag = await runNew(ws.dir, ['compound', 'GemSlot', '--layer', 'renderer-gems']);
  });

  afterAll(() => rmSync(ws.dir, { recursive: true, force: true }));

  it('writes the layer of tessera.config.json, of the apps entry, or of --layer', () => {
    expect(Object.values(ws.results).map((result) => result.status)).toEqual([0, 0, 0, 0]);
    expect(wsRead('packages/input/src/renderer/composites/StickDial/StickDial.tsx')).toMatch(/^\/\* @layer renderer-shell @kind component \*\//);
    expect(wsRead('packages/input/src/renderer/composites/StickDial/StickDial.css')).toMatch(/^\/\* @layer renderer-shell @kind style \*\//);
    expect(wsRead('apps/desktop/src/views/SaveList/SaveList.usage.ts')).toMatch(/^\/\* @layer renderer-desktop @kind data \*\//);
    expect(wsRead('packages/design/src/compounds/GemSlot/GemSlot.type.ts')).toMatch(/^\/\* @layer renderer-gems @kind types \*\//);
    expect(read('packages/design/src/compounds/SaveSlot/SaveSlot.tsx')).toMatch(/^\/\* @layer renderer-app @kind component \*\//);
  });

  it('imports a usage example from the part package and the export that holds it, and relatively inside one package', () => {
    expect(wsRead('packages/input/src/renderer/composites/StickDial/StickDial.usage.ts')).toContain('import { StickDial } from \'@fixture/input/renderer\';');
    expect(wsRead('packages/design/src/compounds/SaveSlot/SaveSlot.usage.ts')).toContain('import { SaveSlot } from \'@fixture/design\';');
    expect(wsRead('apps/desktop/src/views/SaveList/SaveList.usage.ts')).toContain('import { SaveList } from \'../SaveList\';');
  });

  it('writes a story only for a package that lists StoryLite, into that package when no stories folder is set', () => {
    expect(wsRead('packages/design/stories/compounds/SaveSlot.stories.tsx')).toContain('import { SaveSlot } from \'../../src/compounds/SaveSlot\';');
    expect(wsHas('stories/composites/StickDial.stories.tsx')).toBe(false);
    expect(wsHas('packages/input/stories')).toBe(false);
    expect(wsHas('stories/views/SaveList.stories.tsx')).toBe(false);
    expect(wsHas('apps/desktop/stories')).toBe(false);
  });

  it('refuses a --layer that is not a layer name', async () => {
    const result = await runNew(ws.dir, ['compound', 'RuneSlot', '--layer', 'Renderer_Shell']);
    expect(result.status).toBe(1);
    expect(result.out).toContain('--layer Renderer_Shell is not a layer name');
    expect(wsHas('packages/design/src/compounds/RuneSlot')).toBe(false);
  });
});

describe('tessera new with a tessera.config.json but no Tessera', () => {
  it('says Tessera is not installed in the app or the repo root', async () => {
    const dir = fixtureRepo({ ...MONOREPO, 'package.json': { name: 'fixture-root', private: true } });
    const result = await runNew(join(dir, 'apps/desktop'), ['compound', 'SaveSlot']);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(1);
    expect(result.out).toContain('@drizztdourden08/tessera is not installed in');
  });

  it('names the broken key of the config', async () => {
    const dir = fixtureRepo({ ...MONOREPO, 'tessera.config.json': { parts: { widgets: 'src/widgets' } } });
    const result = await runNew(dir, ['compound', 'SaveSlot']);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(1);
    expect(result.out).toContain('unknown key "parts.widgets"');
  });
});
