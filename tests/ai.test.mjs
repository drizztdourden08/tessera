/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { findSlop } from '@drizztdourden08/brock-lint-config/slop-patterns';
import { beforeAll, describe, expect, it } from 'vitest';
import { aiFiles } from '../scripts/ai/ai-files.mjs';
import { collectAi } from '../scripts/ai/collect-ai.mjs';
import { compareAi } from '../scripts/ai/compare-ai.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PILOT = fileURLToPath(new URL('fixtures/ai/pilot', import.meta.url));
const PILOT_NAMES = ['Button', 'ButtonGroup', 'ButtonRow', 'ConfirmIconButton', 'IconButton'];
const TIMEOUT = 60_000;
const committed = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');

describe('the committed ai folder', () => {
  let files;
  beforeAll(async () => {
    files = aiFiles(await collectAi(ROOT));
  }, TIMEOUT);

  it('holds every file pnpm ai writes, as it writes them', () => {
    for (const [path, content] of Object.entries(files)) expect(committed(path), path).toBe(content);
  });

  it('holds nothing pnpm ai no longer writes', () => {
    expect(compareAi(ROOT, files)).toEqual([]);
  });

  it('reports a page that changed by hand', () => {
    const edited = { ...files, 'ai/rules.md': `${files['ai/rules.md']}An extra line.\n` };
    expect(compareAi(ROOT, edited).map((f) => f.kind)).toEqual(['drift']);
  });
});

describe('the pilot usage files', () => {
  let model;
  let files;
  beforeAll(async () => {
    model = await collectAi(ROOT, { usageDir: PILOT });
    files = aiFiles(model);
  }, TIMEOUT);

  it('pass every check', () => {
    expect(model.findings.filter((f) => !f.coverage)).toEqual([]);
  });

  it('give each component its own page', () => {
    expect(Object.keys(files).filter((path) => path.startsWith('ai/components/')).sort()).toEqual(PILOT_NAMES.map((name) => `ai/components/${name}.md`));
  });

  it('place each component at its answer in decide.md, with its rule', () => {
    expect(files['ai/decide.md']).toContain('    - Peer actions on one thing, read as one tool: [ButtonGroup](components/ButtonGroup.md). Peer actions joined into one tool by shared borders.');
    expect(files['ai/decide.md']).toContain('    - Goes to a URL: no component yet.');
  });

  it('read the props, defaults and inherited attributes from the code', () => {
    const page = files['ai/components/ButtonGroup.md'];
    expect(page).toContain('- `orientation` (optional): `ButtonGroupOrientation`, one of `\'horizontal\'`, `\'vertical\'`. Default `\'horizontal\'`.');
    expect(page).toContain('- `children`: `ReactNode`.');
    expect(page).toMatch(/It also takes the \d+ attributes it inherits through `Omit<HTMLAttributes<HTMLDivElement>, 'role'>`\./);
  });

  it('read the tokens and the gallery page, and leave the review status out', () => {
    const page = files['ai/components/ButtonGroup.md'];
    expect(page).toContain('`--c-border`');
    expect(page).toContain('(`#/story/primitives-buttongroup--overview`)');
    expect(page).not.toMatch(/approved|review/i);
    expect(files['ai/registry.json']).not.toMatch(/"review"|"status"/);
  });

  it('link an alternative only when it has a page', () => {
    const page = files['ai/components/ButtonGroup.md'];
    expect(page).toContain('Use [ButtonRow](ButtonRow.md) instead.');
    expect(page).toContain('Use `DropdownMenu` instead.');
  });

  it('write prose that passes the writing gate', () => {
    const hits = Object.values(files).flatMap((text) => findSlop(text));
    expect(hits.map((hit) => hit.match)).toEqual([]);
  });

  it('write a registry with the tree and each component', () => {
    const registry = JSON.parse(files['ai/registry.json']);
    expect(registry.tree.answers.actions.answers['one action'].answers['a visible word']).toEqual({ components: ['Button'] });
    expect(registry.components.find((c) => c.name === 'IconButton')).toMatchObject({ usage: true, imports: ['@drizztdourden08/tessera', '@drizztdourden08/tessera/primitives'] });
  });
});
