/* @layer tooling-scripts @kind test */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { withUsageJobs } from '../.storylite/catalogue-jobs';

const ROOT = mkdtempSync(join(tmpdir(), 'tessera-catalogue-'));
const TIERS = [{
  tier: 'Primitives',
  intro: 'Tier 1.',
  groups: [{ group: 'Actions', entries: [{ name: 'Button', summary: 'Old summary.' }, { name: 'IconButton', summary: 'Kept summary.' }] }],
}];

mkdirSync(join(ROOT, 'src/primitives/Button'), { recursive: true });
writeFileSync(join(ROOT, 'src/primitives/Button/Button.usage.ts'), "const usage = {\n  job: 'A button with a visible word that runs one action.',\n};\n");

afterAll(() => rmSync(ROOT, { recursive: true }));

describe('the gallery catalogue', () => {
  it('takes a summary from the usage job, and keeps its own text where no usage file exists', () => {
    const [entry, other] = withUsageJobs(ROOT, TIERS)[0].groups[0].entries;
    expect(entry.summary).toBe('A button with a visible word that runs one action.');
    expect(other.summary).toBe('Kept summary.');
  });
});
