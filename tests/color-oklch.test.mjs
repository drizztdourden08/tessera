/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { clampOklch } from '../src/composites/ColorPicker/behavior/clamp-oklch';
import { hexToOklch } from '../src/composites/ColorPicker/behavior/hex-to-oklch';
import { hexToHsv } from '../src/composites/ColorPicker/behavior/hex-to-hsv';
import { hsvToHex } from '../src/composites/ColorPicker/behavior/hsv-to-hex';
import { oklchInGamut } from '../src/composites/ColorPicker/behavior/oklch-in-gamut';
import { oklchToHex } from '../src/composites/ColorPicker/behavior/oklch-to-hex';
import { oklchToRgb } from '../src/composites/ColorPicker/behavior/oklch-to-rgb';
import { rgbToOklch } from '../src/composites/ColorPicker/behavior/rgb-to-oklch';

describe('rgb to oklch, against known values', () => {
  it('reads white as full lightness with no chroma', () => {
    const white = rgbToOklch({ r: 255, g: 255, b: 255 });
    expect(white.l).toBeCloseTo(1, 4);
    expect(white.c).toBe(0);
  });

  it('reads black as zero lightness', () => {
    expect(rgbToOklch({ r: 0, g: 0, b: 0 }).l).toBeCloseTo(0, 4);
  });

  it('reads the sRGB primaries', () => {
    const red = rgbToOklch({ r: 255, g: 0, b: 0 });
    expect(red.l).toBeCloseTo(0.62796, 4);
    expect(red.c).toBeCloseTo(0.25768, 4);
    expect(red.h).toBeCloseTo(29.234, 2);
    const green = rgbToOklch({ r: 0, g: 255, b: 0 });
    expect(green.l).toBeCloseTo(0.86644, 4);
    expect(green.c).toBeCloseTo(0.29483, 4);
    expect(green.h).toBeCloseTo(142.495, 2);
    const blue = rgbToOklch({ r: 0, g: 0, b: 255 });
    expect(blue.l).toBeCloseTo(0.45201, 4);
    expect(blue.c).toBeCloseTo(0.31321, 4);
    expect(blue.h).toBeCloseTo(264.052, 2);
  });
});

describe('oklch back to hex', () => {
  it('round trips colours that sit inside sRGB', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0000ff', '#38a048', '#e84830', '#808080', '#ffffff', '#000000', '#3f8fd2']) {
      expect(oklchToHex(hexToOklch(hex))).toBe(hex);
    }
  });

  it('turns the red primary values back into red', () => {
    expect(oklchToRgb({ l: 0.62796, c: 0.25768, h: 29.234 })).toEqual({ r: 255, g: 0, b: 0 });
  });
});

describe('gamut clamping', () => {
  it('knows a colour that fits sRGB and one that does not', () => {
    expect(oklchInGamut(hexToOklch('#38a048'))).toBe(true);
    expect(oklchInGamut({ l: 0.7, c: 0.1, h: 150 })).toBe(true);
    expect(oklchInGamut({ l: 0.7, c: 0.4, h: 150 })).toBe(false);
    expect(oklchInGamut({ l: 0.5, c: 0.35, h: 200 })).toBe(false);
  });

  it('keeps lightness and hue and lowers chroma until the colour fits', () => {
    const wanted = { l: 0.7, c: 0.4, h: 150 };
    const clamped = clampOklch(wanted);
    expect(clamped.l).toBe(0.7);
    expect(clamped.h).toBe(150);
    expect(clamped.c).toBeLessThan(0.4);
    expect(clamped.c).toBeGreaterThan(0.1);
    expect(oklchInGamut(clamped)).toBe(true);
    expect(oklchInGamut({ ...clamped, c: clamped.c + 0.01 })).toBe(false);
  });

  it('leaves a colour that fits as it is', () => {
    const fits = { l: 0.7, c: 0.1, h: 150 };
    expect(clampOklch(fits)).toEqual(fits);
  });

  it('turns any lightness at or past the ends into pure white or black', () => {
    expect(clampOklch({ l: 1.2, c: 0.3, h: 40 })).toEqual({ l: 1, c: 0, h: 40 });
    expect(clampOklch({ l: -0.1, c: 0.3, h: 40 })).toEqual({ l: 0, c: 0, h: 40 });
    expect(oklchToHex({ l: 1.3, c: 0.3, h: 40 })).toBe('#ffffff');
    expect(oklchToHex({ l: 0, c: 0.3, h: 40 })).toBe('#000000');
  });

  it('hands back a valid hex for a colour far outside sRGB', () => {
    expect(oklchToHex({ l: 0.6, c: 0.4, h: 300 })).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('hsv', () => {
  it('reads known colours', () => {
    expect(hexToHsv('#ff0000')).toEqual({ h: 0, s: 100, v: 100 });
    expect(hexToHsv('#00ff00')).toEqual({ h: 120, s: 100, v: 100 });
    expect(hexToHsv('#0000ff')).toEqual({ h: 240, s: 100, v: 100 });
    expect(hexToHsv('#808080')).toEqual({ h: 0, s: 0, v: 50 });
    expect(hexToHsv('#ff00ff')).toEqual({ h: 300, s: 100, v: 100 });
  });

  it('writes known colours', () => {
    expect(hsvToHex({ h: 0, s: 100, v: 100 })).toBe('#ff0000');
    expect(hsvToHex({ h: 120, s: 100, v: 100 })).toBe('#00ff00');
    expect(hsvToHex({ h: 240, s: 100, v: 50 })).toBe('#000080');
    expect(hsvToHex({ h: 200, s: 0, v: 100 })).toBe('#ffffff');
  });
});
