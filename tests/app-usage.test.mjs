/* @layer tooling-scripts @kind test */
import { spawnSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { collectApp } from '../scripts/ai/collect-app.mjs';
import { graftBranch } from '../scripts/ai/graft-branch.mjs';
import { run as check } from '../scripts/cli/check-command.mjs';
import { run as writeGuide } from '../scripts/cli/ai-command.mjs';
import { loadTesseraConfig } from '../scripts/config/load-tessera-config.mjs';
import { tesseraExtension } from '../scripts/standards/tessera-extension.mjs';
import { appUsageFixture } from './app-usage-fixture.mjs';

const TIMEOUT = 120_000;
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TSC = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
const state = { dir: '', outputs: [], model: undefined };
const at = (path) => join(state.dir, path);
const read = (path) => readFileSync(at(path), 'utf8');
const pairs = (findings) => findings.map((f) => `${f.kind} ${f.name ?? ''}`.trim()).sort();

const command = async (runIt, cwd, argv = []) => {
  const lines = [];
  const status = await runIt(argv, { cwd, io: { log: (line) => lines.push(line), warn: (line) => lines.push(line) } });
  return { status, out: lines.join('\n') };
};

const withMode = async (mode, work) => {
  const file = at('tessera.config.json');
  const original = read('tessera.config.json');
  const config = JSON.parse(original);
  writeFileSync(file, JSON.stringify({ ...config, ai: { ...config.ai, usage: mode } }));
  try {
    return await work();
  } finally {
    writeFileSync(file, original);
  }
};

beforeAll(async () => {
  Object.assign(state, await appUsageFixture());
  state.model = await collectApp(loadTesseraConfig(state.dir));
}, TIMEOUT);

afterAll(() => rmSync(state.dir, { recursive: true, force: true }));

describe('the usage check of app parts', () => {
  it('passes a usage file tessera new wrote once its sentences are filled', () => {
    expect(state.outputs.map((output) => output.status)).toEqual([0, 0, 0, 0, 0]);
    expect(state.model.findings.filter((f) => ['SaveSlot', 'SaveList'].includes(f.name))).toEqual([]);
  });

  it('finds every part in the parts folders, the views of each app included', () => {
    expect(state.model.components.map((c) => c.folder)).toEqual([
      'packages/design/src/panels/RunePanel', 'packages/design/src/compounds/SaveSlot',
      'apps/desktop/src/views/BadView', 'apps/desktop/src/views/Bare', 'apps/desktop/src/views/Home', 'apps/desktop/src/views/SaveList',
    ]);
  });

  it('runs the Tessera checks on them, with app parts as alternatives and the app tree for tree.path', () => {
    expect(pairs(state.model.findings)).toEqual([
      'example BadView', 'missing-usage Bare', 'off-tree BadView',
      ...Array(5).fill('placeholder Home'), 'stale-props RunePanel', 'unknown-alternative BadView', 'unreached-leaf',
    ]);
    expect(state.model.findings.find((f) => f.kind === 'unreached-leaf').message).toBe('a saved game > an old save');
    expect(state.model.findings.find((f) => f.kind === 'unknown-alternative').message).toContain('neither a Tessera export nor a part of this app');
  });

  it('reads the props through the app tsconfig and names the hash a stale usage should take', () => {
    const rune = state.model.components.find((c) => c.name === 'RunePanel');
    expect(rune.props.own.map((prop) => prop.name)).toContain('glow');
    expect(state.model.findings.find((f) => f.kind === 'stale-props').message).toContain(`propsHash: '${rune.propsHash}'`);
  });

  it('type-checks each example against the app', () => {
    expect(state.model.findings.find((f) => f.kind === 'example').message).toContain('Property \'heading\' does not exist');
  });
});

describe('the usage types in an app', () => {
  const tsc = (project) => spawnSync(process.execPath, [TSC, '--noEmit', '-p', project], { cwd: state.dir, encoding: 'utf8' }).stdout
    .split('\n').filter((line) => line.includes('error TS'));

  it('take the app part names and the app answers that TesseraApps adds, and nothing else', () => {
    expect(tsc('packages/design/tsconfig.json')).toEqual([]);
    const errors = tsc('apps/desktop/tsconfig.json');
    expect(errors.map((line) => line.slice(0, line.indexOf('(')))).toEqual(Array(2).fill('apps/desktop/src/views/BadView/BadView.usage.ts'));
    expect(errors[0]).toContain('Type \'"SaveRow"\' is not assignable to type \'ComponentName\'');
    expect(errors[1]).toContain('Did you mean \'"one save"\'?');
  }, TIMEOUT);
});

describe('tessera check and tessera ai', () => {
  it('runs pnpm ai --check in the Tessera repo', async () => {
    const result = await command(check, ROOT);
    expect(result.status).toBe(0);
    expect(result.out).toContain('ai: ai/ matches what pnpm ai writes.');
  }, TIMEOUT);

  it('prints every finding and passes in report mode', async () => {
    const result = await command(check, state.dir);
    expect(result.status).toBe(0);
    expect(result.out).toContain('tessera: report mode (tessera.config.json ai.usage).');
    expect(result.out).toContain('tessera: 5 of 6 parts have a usage file.');
    expect(result.out).toContain('stale-props RunePanel: propsHash is');
    expect(result.out).toContain('tessera: 1 usage file(s) still hold sentences tessera new wrote: Home.');
  }, TIMEOUT);

  it('fails on any finding in enforce mode, run from inside an app too', async () => {
    const results = await withMode('enforce', async () => [await command(check, state.dir), await command(check, at('apps/desktop'))]);
    expect(results.map((result) => result.status)).toEqual([1, 1]);
    expect(results[1].out).toContain('tessera: enforce mode (tessera.config.json ai.usage). Every finding fails the check.');
  }, TIMEOUT);

  it('writes the app guide to ai.out, linked to the Tessera guide', async () => {
    const result = await command(writeGuide, state.dir);
    expect(result.out).toContain('tessera: wrote 8 file(s) to ai/.');
    expect(read('ai/README.md')).toContain('[rules.md](../node_modules/@drizztdourden08/tessera/ai/rules.md)');
    expect(read('ai/decide.md')).toContain('  - The list of saves: [SaveList](components/SaveList.md). SaveList draws one saved game.');
    expect(read('ai/components/SaveList.md')).toContain('Use [SaveSlot](SaveSlot.md) instead.');
    expect(read('ai/components/SaveSlot.md')).toContain('import { SaveSlot } from \'@fixture/design\';');
    expect(read('ai/index.md')).toContain('- `Home`: usage not written yet. Its folder is `apps/desktop/src/views/Home`.');
  }, TIMEOUT);
});

describe('the standards extension on an app', () => {
  const structure = (packageDir) => tesseraExtension().structure.checks[0]({ rootDir: state.dir, packageDir: at(packageDir), label: packageDir, pkg: {}, kind: 'package' });

  it('gives the content findings of its own parts as notes in report mode', async () => {
    const design = await structure('packages/design');
    expect(design.findings).toEqual([]);
    expect(design.notes).toEqual([
      expect.stringMatching(/^packages\/design\/src\/panels\/RunePanel: stale-props: propsHash is /),
      'packages/design/src/ai/tree.ts: unreached-leaf: a saved game > an old save',
    ]);
  }, TIMEOUT);

  it('gives them as findings in enforce mode, beside the missing usage files', async () => {
    const desktop = await withMode('enforce', () => structure('apps/desktop'));
    expect(desktop.notes).toEqual([]);
    expect(desktop.findings[0]).toBe('apps/desktop/src/views/Bare: missing Bare.usage.ts (every part in the folders of tessera.config.json says when to use it)');
    expect(desktop.findings.slice(1).map((line) => line.split(': ').slice(0, 2).join(': '))).toEqual([
      'apps/desktop/src/views/BadView: unknown-alternative', 'apps/desktop/src/views/BadView: off-tree',
      ...Array(5).fill('apps/desktop/src/views/Home: placeholder'), 'apps/desktop/src/views/BadView: example',
    ]);
  }, TIMEOUT);
});

describe('an app tree', () => {
  const tree = () => ({ question: 'What?', answers: { data: { question: 'Which data?', answers: { rows: null } }, text: null } });

  it('adds its branches under a question of the tree', () => {
    const merged = tree();
    expect(graftBranch(merged, { at: ['data'], answers: { saves: { question: 'Which save?', answers: { one: null } } } })).toEqual({ leaves: [['data', 'saves', 'one']] });
    expect(Object.keys(merged.answers.data.answers)).toEqual(['rows', 'saves']);
  });

  it('refuses a branch that leads nowhere, takes an answer or holds a broken node', () => {
    expect(graftBranch(tree(), { at: ['text'], answers: { more: null } }).problem).toBe('at [text] does not lead to a question');
    expect(graftBranch(tree(), { at: [], answers: { data: null } }).problem).toBe('"data" already answers "What?"');
    expect(graftBranch(tree(), { at: [], answers: { saves: { answers: {} } } }).problem).toBe('the first question > saves is neither null nor a { question, answers } node');
  });
});
