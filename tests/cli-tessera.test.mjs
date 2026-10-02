/* @layer tooling-scripts @kind test */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { eslint, generateParts, pnpm, runNew, slop, slopIn, structure, stylelint, tesseraCopy, TIMEOUT, typecheck } from './cli-sandbox.mjs';

const EDITED = ['src/primitives/index.ts', 'src/composites/index.ts', '.storylite/catalogue-primitives.constants.ts', '.storylite/catalogue-composites.constants.ts', '.storylite/sidebar-icons.constants.ts'];

const PARTS = [
  { kind: 'primitive', name: 'QuestBanner', folder: 'src/primitives/QuestBanner', argv: ['--group', 'Layout', '--tree', 'actions > one action > a visible word'] },
  { kind: 'composite', name: 'LootTable', folder: 'src/composites/LootTable', argv: ['--group', 'Content', '--icon', 'puzzle'] },
];

const made = generateParts(tesseraCopy, PARTS);

describe('tessera new in the Tessera repo', () => {
  it('creates a primitive and a composite, then runs pnpm ai', () => {
    expect(made.results.map((result) => result.status)).toEqual([0, 0]);
    for (const file of made.files) expect(existsSync(join(made.dir, file)), file).toBe(true);
    expect(made.results.flatMap((result) => result.scripts).map((script) => script.script)).toEqual(['ai', 'ai']);
    expect(made.results[0].out).toContain('tessera: created the primitive QuestBanner.');
    expect(made.results[0].out).toContain('  .storylite/catalogue-primitives.constants.ts');
  });

  it('places the part in the tree, or makes it a building block', () => {
    expect(made.read('src/primitives/QuestBanner/QuestBanner.usage.ts')).toContain('path: [\'actions\', \'one action\', \'a visible word\'],');
    expect(made.read('src/composites/LootTable/LootTable.usage.ts')).toContain('buildingBlock: true,');
  });

  it('exports it, lists it in the catalogue and gives its page an icon', () => {
    expect(made.read('src/primitives/index.ts')).toContain('export { QuestBanner } from \'./QuestBanner\';');
    expect(made.read('src/composites/index.ts')).toContain('export type { LootTableProps } from \'./LootTable\';');
    expect(made.read('.storylite/catalogue-primitives.constants.ts')).toContain('{ name: \'QuestBanner\', summary: \'Write the one job of QuestBanner in one sentence.\' }');
    expect(made.read('.storylite/sidebar-icons.constants.ts')).toMatch(/'Composites · Content': \{[^}]*LootTable: 'puzzle'/);
    expect(made.read('stories/primitives/QuestBanner.stories.tsx')).toContain('title: \'Primitives · Layout/QuestBanner\',');
  });
});

describe('the gates on what tessera new writes in Tessera', () => {
  it('keeps ai/ in step: pnpm ai --check passes with the new usage files', () => {
    const check = pnpm(made.dir, 'ai --check');
    expect(check.status, `${check.stdout}${check.stderr}`).toBe(0);
    expect(made.read('ai/components/QuestBanner.md')).toContain('# QuestBanner');
  }, TIMEOUT);

  it('passes eslint, with the edited catalogue, sidebar and barrels', () => {
    const lint = eslint(made.dir, [...made.code, ...EDITED]);
    expect(lint.status, lint.output).toBe(0);
  }, TIMEOUT);

  it('passes stylelint and the typecheck', () => {
    const lint = stylelint(made.dir, made.styles);
    expect(lint.status, lint.output).toBe(0);
    expect(typecheck(made.dir, made.code)).toEqual([]);
  }, TIMEOUT);

  it('passes brock structure (brock-build 0.1.0 does not take Name.usage.ts yet; 0.1.1 does)', async () => {
    for (const part of PARTS) expect(await structure(made.dir, part.folder)).toEqual([]);
  });

  it('passes the prose rules, in the files and in what it prints', () => {
    expect(slop(made.dir, made.files)).toEqual([]);
    expect(made.results.flatMap((result) => slopIn(result.out))).toEqual([]);
  });
});

describe('what tessera new refuses in Tessera', () => {
  it('refuses a compound or a view, which belong to an app', async () => {
    for (const kind of ['compound', 'view']) {
      const result = await runNew(made.dir, [kind, 'SaveSlot']);
      expect(result.status).toBe(1);
      expect(result.out).toContain(`tessera: a ${kind} is an app's own part, so Tessera does not hold one.`);
      expect(slopIn(result.out)).toEqual([]);
    }
    expect(existsSync(join(made.dir, 'src/compounds'))).toBe(false);
  });

  it('refuses a name that is taken, a group that does not exist and a path off the tree', async () => {
    const outOf = async (...argv) => (await runNew(made.dir, argv)).out;
    expect(await outOf('composite', 'Box', '--group', 'Content')).toContain('src/primitives/Box already exists');
    expect(await outOf('primitive', 'RuneSlot', '--group', 'Nowhere')).toContain('has no group "Nowhere". Its groups: Layout, Display');
    expect(await outOf('primitive', 'RuneSlot')).toContain('pass --group with one of the Primitives groups: Layout');
    expect(await outOf('primitive', 'RuneSlot', '--group', 'Layout', '--tree', 'actions > one action')).toContain('--tree stops at the question "What does the action look like?"');
    expect(await outOf('primitive', 'RuneSlot', '--group', 'Layout', '--icon', 'no-such-icon')).toContain('Lucide has no icon "no-such-icon"');
    expect(await outOf('widget', 'rune-slot')).toContain('"widget" is not a kind');
    expect(existsSync(join(made.dir, 'src/primitives/RuneSlot'))).toBe(false);
  });

  it('writes nothing on a dry run', async () => {
    const before = made.read('src/primitives/index.ts');
    const result = await runNew(made.dir, ['primitive', 'RuneSlot', '--group', 'Layout', '--dry-run']);
    expect(result.status).toBe(0);
    expect(result.out).toContain('tessera: dry run for the primitive RuneSlot, nothing written.');
    expect(result.scripts).toEqual([]);
    expect(existsSync(join(made.dir, 'src/primitives/RuneSlot'))).toBe(false);
    expect(made.read('src/primitives/index.ts')).toBe(before);
  });
});
