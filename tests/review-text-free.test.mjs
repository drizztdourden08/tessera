/* @layer tooling-scripts @kind test */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { reviewPages } from '../.storylite/review-pages';

const ROOT = mkdtempSync(join(tmpdir(), 'tessera-review-text-'));
const FILE = join(ROOT, 'stories/primitives/Button.stories.tsx');

const story = ({ description, points, instead, variant }) => [
  "const meta = {\n  title: 'Primitives · Actions/Button',\n};",
  'const Overview = overviewStory({',
  `  description: '${description}',`,
  `  points: [\n${points.map((point) => `    '${point}',`).join('\n')}\n  ],`,
  `  instead: '${instead}',`,
  `  variants: ['${variant}'],`,
  '});',
  'export { Overview };',
  '',
].join('\n');

const BASE = { description: 'A control that runs an action.', points: ['One', 'Two'], instead: '[Link] to go somewhere.', variant: 'primary' };

const hashOf = (parts) => {
  writeFileSync(FILE, story({ ...BASE, ...parts }));
  return reviewPages(ROOT)[0]?.hash;
};

mkdirSync(join(ROOT, 'stories/primitives'), { recursive: true });
afterAll(() => rmSync(ROOT, { recursive: true }));

describe('the review hash', () => {
  it('ignores the overview description, points and instead line', () => {
    const before = hashOf({});
    expect(hashOf({ description: 'Runs an action when pressed, with \\\'quotes\\\'.' })).toBe(before);
    expect(hashOf({ points: ['Only one, rewritten', '`code` and **bold**', 'A third'] })).toBe(before);
    expect(hashOf({ instead: '[IconButton] for icon-only actions.' })).toBe(before);
  });

  it('still changes when the page itself changes', () => {
    expect(hashOf({ variant: 'danger' })).not.toBe(hashOf({}));
  });
});
