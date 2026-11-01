/* @layer tooling-scripts @kind test */
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { guideFiles } from '../scripts/guide/guide-files.mjs';
import { collectGuide } from '../scripts/guide/collect-guide.mjs';
import { compareGuide } from '../scripts/guide/compare-guide.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PILOT = fileURLToPath(new URL('fixtures/guide/pilot', import.meta.url));

describe('E2 the committed guide folder', { tags: ['e2e'] }, () => {
  let files;
  beforeAll(async () => {
    files = guideFiles(await collectGuide(ROOT));
  });

  it('reports a page that changed by hand', () => {
    const edited = { ...files, 'guide/rules.md': `${files['guide/rules.md']}An extra line.\n` };
    expect(compareGuide(ROOT, edited).map((f) => f.kind)).toEqual(['drift']);
  });
});

describe('E2 the pilot usage files', { tags: ['e2e'] }, () => {
  let model;
  let files;
  beforeAll(async () => {
    model = await collectGuide(ROOT, { usageDir: PILOT });
    files = guideFiles(model);
  });

  it('pass every check', () => {
    expect(model.findings.filter((f) => !f.coverage)).toEqual([]);
  });

  it('read the props, defaults and inherited attributes from the code', () => {
    const page = files['guide/components/ButtonGroup.md'];
    expect(page).toContain('- `orientation` (optional): `ButtonGroupOrientation`, one of `\'horizontal\'`, `\'vertical\'`. Default `\'horizontal\'`.');
    expect(page).toContain('- `children`: `ReactNode`.');
    expect(page).toMatch(/It also takes the \d+ attributes it inherits through `Omit<HTMLAttributes<HTMLDivElement>, 'role'>`\./);
  });

  it('link an alternative only when it has a page', () => {
    const page = files['guide/components/ButtonGroup.md'];
    expect(page).toContain('Use [ButtonRow](ButtonRow.md) instead.');
    expect(page).toContain('Use `DropdownMenu` instead.');
  });

  it('write a registry with the tree and each component', () => {
    const registry = JSON.parse(files['guide/registry.json']);
    expect(registry.tree.answers.actions.answers['one action'].answers['a visible word']).toEqual({ components: ['Button'] });
    expect(registry.components.find((c) => c.name === 'IconButton')).toMatchObject({ usage: true, imports: ['@drizztdourden08/tessera', '@drizztdourden08/tessera/primitives'] });
  });
});
