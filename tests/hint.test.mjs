/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { nextHintEntries } from '../src/primitives/hint/next-hint-entries';

const LEFT = { label: 'Dock left', description: 'Takes the left edge of the app' };
const FLOAT = { label: 'Float', description: 'Hovers over the main view' };

describe('K1 nextHintEntries', { tags: ['critical'] }, () => {
  it('keeps one entry per source, newest last, and drops a cleared source', () => {
    const one = nextHintEntries([], 'a', LEFT);
    const two = nextHintEntries(one, 'b', FLOAT);
    expect(two.map((entry) => entry.source)).toEqual(['a', 'b']);
    expect(nextHintEntries(two, 'a', LEFT).map((entry) => entry.source)).toEqual(['b', 'a']);
    expect(nextHintEntries(two, 'b', null)).toEqual([{ source: 'a', hint: LEFT }]);
  });
});
