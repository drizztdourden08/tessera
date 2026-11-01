/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { pixelIconSize } from '../src/primitives/Icon';

describe('K1 the pixel icon size', { tags: ['critical'] }, () => {
  it.each([[16, 24], [30, 24], [40, 48], [48, 48], [59, 48], [64, 72], [1, 24]])('snaps %i px to %i px', (size, snapped) => {
    expect(pixelIconSize(size)).toBe(snapped);
  });
});
