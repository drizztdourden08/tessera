/* @layer tooling-scripts @kind test */
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { run as check } from '../scripts/cli/check-command.mjs';
import { run as writeGuide } from '../scripts/cli/guide-command.mjs';
import { writeTree } from './config-fixture.mjs';
import { appUsageFixture } from './app-usage-fixture.mjs';

const TIMEOUT = 120_000;
const PARTS_FILES = { root: 'packages/design/src/guide/parts.type.ts', app: 'apps/desktop/src/guide/parts.type.ts' };
const PLACES = ['.', 'apps/desktop'];
const state = { dir: '' };
const at = (path) => join(state.dir, path);
const read = (path) => readFileSync(at(path), 'utf8');
const files = () => Object.values(PARTS_FILES).map(read);

const command = async (runIt, place) => {
  const lines = [];
  const status = await runIt([], { cwd: at(place), io: { log: (line) => lines.push(line), warn: (line) => lines.push(line) } });
  return { status, out: lines.join('\n') };
};

const checkEverywhere = async () => {
  const results = [];
  for (const place of PLACES) results.push(await command(check, place));
  return results;
};

beforeAll(async () => {
  Object.assign(state, await appUsageFixture());
  const config = JSON.parse(read('tessera.config.json'));
  const apps = {
    'apps/desktop': { ...config.apps['apps/desktop'], guide: { parts: PARTS_FILES.app } },
    'apps/web': { parts: { views: 'apps/web/src/views' } },
  };
  writeFileSync(at('tessera.config.json'), JSON.stringify({ ...config, guide: { ...config.guide, parts: PARTS_FILES.root }, apps }));
  writeTree(state.dir, {
    'apps/web/package.json': { name: '@fixture/web', private: true },
    'apps/web/src/views/Shop/Shop.tsx': 'const Shop = () => null;\n\nexport { Shop };\n',
  });
}, TIMEOUT);

afterAll(() => rmSync(state.dir, { recursive: true, force: true }));

describe('the parts modules of a monorepo with apps', () => {
  it('keeps each part folder in the parts file of the config that names it', async () => {
    await command(writeGuide, '.');
    const [root, app] = files();
    expect(root).toContain(['      parts:', "        | 'RunePanel'", "        | 'SaveSlot'", "        | 'Shop';"].join('\n'));
    expect(app).toContain(['      parts:', "        | 'BadView'", "        | 'Bare'", "        | 'Home'", "        | 'SaveList';"].join('\n'));
  }, TIMEOUT);

  it.each(PLACES)('writes from %s the files a run from the root writes, and tessera check passes from both places', async (place) => {
    const before = files();
    const written = await command(writeGuide, place);
    expect(files()).toEqual(before);
    expect(written.out).toContain(`tessera: wrote the part names to ${PARTS_FILES.root}.`);
    const results = await checkEverywhere();
    expect(results.map((result) => result.status)).toEqual([0, 0]);
    for (const result of results) expect(result.out).not.toContain('parts-module');
  }, TIMEOUT);
});
