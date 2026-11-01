/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { BRAND_FAMILY, markInk } from '../src/brand';

describe('K1 the Argus mark draws in the colour of its surroundings', { tags: ['critical'] }, () => {
  it('turns currentColor into black or white for a file', () => {
    const { mark } = BRAND_FAMILY.argus;
    expect(markInk(mark, 'light').paths.every((p) => p.ink === '#000000')).toBe(true);
    expect(markInk(mark, 'dark').paths.every((p) => p.ink === '#ffffff')).toBe(true);
  });

  it('leaves a mark with no current ink as it is', () => {
    const { mark } = BRAND_FAMILY.tessera;
    expect(markInk(mark, 'dark')).toBe(mark);
  });
});
