/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { chevronSizeOf } from '../src/composites/SplitButton/behavior/chevron-size-of';

describe('K1 SplitButton', { tags: ['critical'] }, () => {
  it('gives the chevron a size to match the button', () => {
    expect(chevronSizeOf('xs')).toBe('xs');
    expect(chevronSizeOf('sm')).toBe('sm');
    expect(chevronSizeOf('md')).toBe('md');
    expect(chevronSizeOf('lg')).toBe('md');
  });
});
