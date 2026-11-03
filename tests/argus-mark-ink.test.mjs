/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { BRAND_FAMILY, markInk } from '../src/brand';

const FIXED = '#2dba88';

const inkedMark = {
  viewBox: '0 0 64 64',
  currentInk: { light: '#000000', dark: '#ffffff' },
  paths: [
    { ink: 'currentColor', d: 'M0 0H8V8Z' },
    { ink: FIXED, d: 'M8 8H16V16Z' },
  ],
};

describe('K1 a mark with a current ink draws in the colour of its surroundings', { tags: ['critical'] }, () => {
  it('turns currentColor into black or white and keeps fixed colours', () => {
    expect(markInk(inkedMark, 'light').paths.map((p) => p.ink)).toEqual(['#000000', FIXED]);
    expect(markInk(inkedMark, 'dark').paths.map((p) => p.ink)).toEqual(['#ffffff', FIXED]);
  });

  it('leaves the Argus shield, which has only fixed colours, as it is', () => {
    const { mark } = BRAND_FAMILY.argus;
    expect(markInk(mark, 'light')).toBe(mark);
    expect(markInk(mark, 'dark')).toBe(mark);
  });

  it('leaves a mark with no current ink as it is', () => {
    const { mark } = BRAND_FAMILY.tessera;
    expect(markInk(mark, 'dark')).toBe(mark);
  });
});
