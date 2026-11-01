/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { share } from '../src/primitives/ProgressBar/behavior/share';

describe('K1 ProgressBar', { tags: ['critical'] }, () => {
  it('keeps a share between 0 and 100 and is empty with no range', () => {
    expect(share(50, 200)).toBe(25);
    expect(share(300, 200)).toBe(100);
    expect(share(5, 0)).toBe(0);
  });
});
