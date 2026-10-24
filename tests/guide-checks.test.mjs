/* @layer tooling-scripts @kind test */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { guideFiles } from '../scripts/guide/guide-files.mjs';
import { guideMode } from '../scripts/guide/guide-mode.mjs';
import { guideVerdict } from '../scripts/guide/guide-verdict.mjs';
import { collectGuide } from '../scripts/guide/collect-guide.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const fixture = (name) => fileURLToPath(new URL(`fixtures/guide/${name}`, import.meta.url));
const TIMEOUT = 60_000;

const problemsIn = async (name) =>
  (await collectGuide(ROOT, { usageDir: fixture(name) })).findings.filter((f) => !f.coverage).map(({ kind, name: component }) => ({ kind, component }));

const hookNames = (m) => m.exports.filter((e) => e.kind === 'hook').map((e) => e.name);

const summary = (m) => ({ name: m.name, page: m.page, hooks: hookNames(m) });

const modeOf = (config) => {
  const dir = mkdtempSync(join(tmpdir(), 'tessera-guide-'));
  if (config) writeFileSync(join(dir, 'tessera.config.json'), JSON.stringify(config));
  try {
    return guideMode(dir);
  } finally {
    rmSync(dir, { recursive: true });
  }
};

describe('each usage check', () => {
  it.each([
    ['missing-field', 'missing-field', 'Badge'],
    ['bad-alternative', 'unknown-alternative', 'Status'],
    ['off-tree', 'off-tree', 'Tag'],
    ['stale-props', 'stale-props', 'Toggle'],
    ['broken-example', 'example', 'Checkbox'],
  ])('the %s fixture fails with %s on %s, and with nothing else', async (name, kind, component) => {
    expect(await problemsIn(name)).toEqual([{ kind, component }]);
  }, TIMEOUT);

  it('names the hash a stale usage should take', async () => {
    const { findings, components } = await collectGuide(ROOT, { usageDir: fixture('stale-props') });
    const toggle = components.find((c) => c.name === 'Toggle');
    expect(findings.find((f) => f.kind === 'stale-props').message).toContain(`propsHash: '${toggle.propsHash}'`);
  }, TIMEOUT);

  it('keeps a building block out of the tree and lists it on its own', async () => {
    const model = await collectGuide(ROOT, { usageDir: fixture('building-block') });
    const files = guideFiles(model);
    expect(model.findings.filter((f) => !f.coverage)).toEqual([]);
    expect(files['guide/decide.md']).toContain('## Building blocks');
    expect(files['guide/decide.md']).toContain('- [Portal](components/Portal.md). Renders its children');
    expect(files['guide/components/Portal.md']).toContain('## A building block');
  }, TIMEOUT);

  it('lists every component without usage and every answer no component reaches', async () => {
    const { findings, components, leaves } = await collectGuide(ROOT, { usageDir: fixture('pilot') });
    expect(findings.filter((f) => f.kind === 'missing-usage')).toHaveLength(components.length - 5);
    expect(findings.filter((f) => f.kind === 'unreached-leaf')).toHaveLength(leaves.length - 5);
  }, TIMEOUT);
});

describe('a usage file for a hook module', () => {
  it('is accepted for a lowercase folder that a tier index re-exports, and gets its own page and index section', async () => {
    const model = await collectGuide(ROOT, { usageDir: fixture('hook-module') });
    const files = guideFiles(model);
    expect(model.findings.filter((f) => !f.coverage)).toEqual([]);
    expect(model.modules.map(summary)).toEqual([
      { name: 'reorder', page: true, hooks: ['useMoveFocus', 'useReorderDrag'] },
    ]);
    expect(files['guide/components/reorder.md']).toContain('## What it exports');
    expect(files['guide/components/reorder.md']).toContain('Use `useMoveFocus` instead.');
    expect(files['guide/index.md']).toContain('## Hooks');
    expect(files['guide/decide.md']).not.toContain('components/reorder.md');
    expect(JSON.parse(files['guide/registry.json']).modules.map((m) => m.name)).toEqual(['reorder']);
  }, TIMEOUT);

  it('keeps hook modules out of the component list and the coverage gaps', async () => {
    const { components, findings } = await collectGuide(ROOT, { usageDir: fixture('hook-module') });
    expect(components.some((c) => c.name === 'reorder')).toBe(false);
    expect(findings.filter((f) => f.name === 'reorder')).toEqual([]);
  }, TIMEOUT);

  it('fails a hook module that sits in the tree', async () => {
    expect(await problemsIn('hook-with-tree')).toEqual([{ kind: 'missing-field', component: 'reorder' }]);
  }, TIMEOUT);

  it('still fails a usage file whose folder no tier index re-exports', async () => {
    expect(await problemsIn('unknown-hook-module')).toEqual([{ kind: 'unknown-usage', component: 'field-kits' }]);
  }, TIMEOUT);
});

describe('the report and enforce switch', () => {
  const gap = { kind: 'missing-usage', name: 'Badge', coverage: true };
  const problem = { kind: 'off-tree', name: 'Tag', coverage: false };

  it('reads report by default and from tessera.config.json guide.usage', () => {
    expect(modeOf()).toEqual({ mode: 'report' });
    expect(modeOf({})).toEqual({ mode: 'report' });
    expect(modeOf({ guide: { usage: 'enforce' } })).toEqual({ mode: 'enforce' });
    expect(modeOf({ guide: { usage: 'loose' } })).toMatchObject({ mode: 'enforce', problem: expect.stringContaining('"guide.usage" is "loose"') });
  });

  it('lets coverage gaps pass in report mode and fails them in enforce mode', () => {
    expect(guideVerdict([gap], { mode: 'report' }).failed).toBe(false);
    expect(guideVerdict([gap], { mode: 'enforce' }).failed).toBe(true);
  });

  it('fails a broken usage file in either mode', () => {
    expect(guideVerdict([gap, problem], { mode: 'report' }).failed).toBe(true);
    expect(guideVerdict([problem], { mode: 'enforce' }).failed).toBe(true);
  });

  it('runs this repo in report mode until Tessera opts in', () => {
    expect(guideMode(ROOT).mode).toBe('report');
  });
});
