/* @layer tooling-scripts @kind test */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { askTree } from '../scripts/cli/ask-tree.mjs';
import { insertInList } from '../scripts/cli/insert-in-list.mjs';
import { parseArgs } from '../scripts/cli/parse-args.mjs';
import { readTree } from '../scripts/cli/read-tree.mjs';
import { treePath } from '../scripts/cli/tree-path.mjs';

const BIN = fileURLToPath(new URL('../scripts/cli/tessera.mjs', import.meta.url));
const VERSION = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version;
const tessera = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8' });

const scripted = (answers) => {
  const out = [];
  return { out, io: { log: (line) => out.push(line), ask: async () => answers.shift() ?? '' } };
};

describe('the tessera bin', () => {
  it('prints its commands and its version', () => {
    expect(tessera('--help').stdout).toContain('new <kind> <Name>');
    expect(tessera('--version').stdout.trim()).toBe(VERSION);
    expect(tessera('new', '--help').stdout).toContain('--dry-run');
  });

  it('refuses a command it does not have', () => {
    const result = tessera('add', 'Button');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('tessera: there is no command "add".');
  });
});

describe('the arguments of tessera new', () => {
  it('reads the kind, the name, the values and the switches', () => {
    expect(parseArgs(['view', 'SaveList', '--group', 'Saves', '--tree=layout > a plain block', '--dry-run', '-y'])).toEqual({
      positionals: ['view', 'SaveList'],
      flags: { 'group': 'Saves', 'tree': 'layout > a plain block', 'dry-run': true, 'yes': true },
      problems: [],
    });
  });

  it('names an unknown option and a missing value', () => {
    expect(parseArgs(['view', 'SaveList', '--colour', 'red', '--group']).problems).toEqual(['there is no option --colour', '--group takes a value']);
  });

  it('reads --layer as a value', () => {
    expect(parseArgs(['compound', 'SaveSlot', '--layer', 'renderer-shell']).flags).toEqual({ layer: 'renderer-shell' });
    expect(parseArgs(['compound', 'SaveSlot', '--layer']).problems).toEqual(['--layer takes a value']);
  });
});

describe('the decision tree', () => {
  const tree = readTree();

  it('takes a path that ends on an answer with no further question', () => {
    expect(treePath(tree, 'actions > one action > a visible word')).toEqual({ path: ['actions', 'one action', 'a visible word'] });
  });

  it('lists the answers when a step is wrong or the path stops early', () => {
    expect(treePath(tree, 'actions > two actions').problem).toContain('"two actions" does not answer "One action, or several related buttons?". Its answers: "one action", "several related buttons"');
    expect(treePath(tree, 'actions').problem).toContain('--tree stops at the question "One action, or several related buttons?"');
    expect(treePath(tree, 'a value the user sets > a range > wide').problem).toContain('a value the user sets > a range is already an answer with no further question; drop "wide"');
  });

  it('asks one question at a time, and an empty answer makes a building block', async () => {
    const picked = scripted(['1', '9', 'x', '2', '3']);
    expect(await askTree(picked.io, tree)).toEqual(['actions', 'several related buttons', 'peer actions on one thing, read as one tool']);
    expect(picked.out).toContain('Type a number from 1 to 2.');
    expect(await askTree(scripted(['']).io, tree)).toBeUndefined();
  });
});

describe('adding to a list in a source file', () => {
  it('adds a line to a list written one item per line', () => {
    expect(insertInList('const A = [\n  1,\n  2,\n];\n', 10, '3')).toBe('const A = [\n  1,\n  2,\n  3,\n];\n');
  });

  it('adds to a list written on one line, past brackets inside strings', () => {
    expect(insertInList('{ Tabs: \'a]}\', Link: \'link\' }', 0, 'Box: \'square\'')).toBe('{ Tabs: \'a]}\', Link: \'link\', Box: \'square\' }');
    expect(insertInList('entries: [{ name: \'Hero\' }],', 9, '{ name: \'Map\' }')).toBe('entries: [{ name: \'Hero\' }, { name: \'Map\' }],');
  });
});

describe('runTessera', () => {
  it('runs a command in a given folder and resolves to its exit code', async () => {
    const { runTessera } = await import('../scripts/cli/index.mjs');
    expect(await runTessera(['--version'])).toBe(0);
    expect(await runTessera(['nothing'], { cwd: process.cwd() })).toBe(1);
  });
});
