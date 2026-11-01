/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { colorAlpha } from '../src/primitives/ColorSwatch/behavior/color-alpha';

describe('K1 ColorSwatch alpha', { tags: ['critical'] }, () => {
  it('reads the alpha of hex, rgb, hsl and keyword colours, and calls the rest opaque', () => {
    expect(colorAlpha('#38a048')).toBe(1);
    expect(colorAlpha('#38a')).toBe(1);
    expect(colorAlpha('#38a04800')).toBe(0);
    expect(colorAlpha('#38a048ff')).toBe(1);
    expect(colorAlpha('#0008')).toBeCloseTo(0.533, 2);
    expect(colorAlpha('rgba(0, 0, 0, 0.25)')).toBe(0.25);
    expect(colorAlpha('rgb(0 0 0 / 50%)')).toBe(0.5);
    expect(colorAlpha('hsl(120 40% 40% / 0.2)')).toBe(0.2);
    expect(colorAlpha('rgb(255, 0, 0)')).toBe(1);
    expect(colorAlpha('transparent')).toBe(0);
    expect(colorAlpha('tomato')).toBe(1);
  });
});
