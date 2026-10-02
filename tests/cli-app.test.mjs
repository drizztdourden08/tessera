/* @layer tooling-scripts @kind test */
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { appCopy, eslint, generateParts, removeSandbox, runNew, slop, slopIn, structure, stylelint, TIMEOUT, typecheck } from './cli-sandbox.mjs';

const WARNING = 'tessera: Most primitives and composites belong in Tessera. Build it there unless only this app will ever need it.';
const TREE_ANSWERS = ['2', '2', '1'];

const PARTS = [
  { kind: 'compound', name: 'SaveSlot', folder: 'src/compounds/SaveSlot', argv: ['--tree', 'a status, a count or a label > a label and its value'] },
  { kind: 'view', name: 'SaveList', folder: 'src/views/SaveList', argv: ['--group', 'Saves'] },
  { kind: 'primitive', name: 'HelpWebview', folder: 'src/primitives/HelpWebview', argv: ['--yes'] },
  { kind: 'composite', name: 'MapLegend', folder: 'src/composites/MapLegend', argv: [], interactive: true, answers: ['y', ...TREE_ANSWERS] },
];

const made = generateParts(appCopy, PARTS);

describe('tessera new in an app that uses Tessera', () => {
  it('creates each kind in the app folders, with a StoryLite story, and runs no pnpm ai', () => {
    expect(made.results.map((result) => result.status)).toEqual([0, 0, 0, 0]);
    for (const file of made.files) expect(existsSync(join(made.dir, file)), file).toBe(true);
    expect(made.results.flatMap((result) => result.scripts)).toEqual([]);
    expect(made.results[0].out).toContain('tessera: created the compound SaveSlot.');
    expect(made.results[2].out).toContain('tessera: created the app primitive HelpWebview.');
  });

  it('builds from Tessera parts imported from the package', () => {
    expect(made.read('src/compounds/SaveSlot/SaveSlot.tsx')).toContain('import { Box, Text } from \'@drizztdourden08/tessera\';');
    expect(made.read('src/views/SaveList/SaveList.tsx')).toContain('<Box as="section"');
    expect(made.read('src/compounds/SaveSlot/SaveSlot.usage.ts')).toContain('import type { ComponentUsage } from \'@drizztdourden08/tessera\';');
    expect(made.read('stories/views/SaveList.stories.tsx')).toContain('title: \'Views · Saves/SaveList\',');
  });

  it('warns before an app primitive or composite and asks to confirm', () => {
    expect(made.results[2].out).toContain(WARNING);
    expect(made.results[3].out).toContain(WARNING);
    expect(made.results[3].out).toContain('Create the app composite MapLegend in src/composites/MapLegend anyway? (y/N)');
    expect(made.results[0].out).not.toContain(WARNING);
  });

  it('offers the decision tree when asked, and takes the picked answers', () => {
    expect(made.results[3].out).toContain('What are you placing?');
    expect(made.read('src/composites/MapLegend/MapLegend.usage.ts')).toContain('path: [\'a value the user sets\', \'one choice\', \'a few, all in view\'],');
    expect(made.read('src/views/SaveList/SaveList.usage.ts')).toContain('buildingBlock: true,');
  });
});

describe('the warning and the gates in an app', () => {
  it('writes nothing for an app primitive when the warning is not confirmed', async () => {
    const quiet = await runNew(made.dir, ['primitive', 'GameCanvas']);
    const declined = await runNew(made.dir, ['composite', 'GameFrame'], { interactive: true, answers: ['n'] });
    expect([quiet.status, declined.status]).toEqual([1, 1]);
    expect(quiet.out).toContain('Run it again with --yes to create it in this app anyway.');
    expect(existsSync(join(made.dir, 'src/primitives/GameCanvas'))).toBe(false);
    expect(existsSync(join(made.dir, 'src/composites/GameFrame'))).toBe(false);
  });

  it('passes eslint with raw HTML banned everywhere, stylelint and the typecheck', () => {
    const lint = eslint(made.dir, made.code);
    expect(lint.status, lint.output).toBe(0);
    const styles = stylelint(made.dir, made.styles);
    expect(styles.status, styles.output).toBe(0);
    expect(typecheck(made.dir, made.code)).toEqual([]);
  }, TIMEOUT);

  it('passes brock structure (brock-build 0.1.0 does not take Name.usage.ts yet; 0.1.1 does) and the prose rules', async () => {
    for (const part of PARTS) expect(await structure(made.dir, part.folder)).toEqual([]);
    expect(slop(made.dir, made.files)).toEqual([]);
    expect(made.results.flatMap((result) => slopIn(result.out))).toEqual([]);
  });

  it('writes no story when the app has no StoryLite', async () => {
    const manifest = JSON.parse(made.read('package.json'));
    delete manifest.devDependencies['@storylite/storylite'];
    writeFileSync(join(made.dir, 'package.json'), JSON.stringify(manifest));
    const result = await runNew(made.dir, ['compound', 'RuneSlot']);
    expect(result.status).toBe(0);
    expect(existsSync(join(made.dir, 'src/compounds/RuneSlot/RuneSlot.tsx'))).toBe(true);
    expect(existsSync(join(made.dir, 'stories/compounds/RuneSlot.stories.tsx'))).toBe(false);
  });
});

describe('tessera new outside Tessera and its apps', () => {
  it('says where to run it', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'tessera-cli-'));
    writeFileSync(join(dir, 'package.json'), '{ "name": "elsewhere" }');
    const result = await runNew(dir, ['compound', 'SaveSlot']);
    removeSandbox(dir);
    expect(result.status).toBe(1);
    expect(result.out).toContain('is not Tessera and does not list @drizztdourden08/tessera');
  });
});
