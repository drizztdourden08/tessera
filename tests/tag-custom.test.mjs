/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { hexInk } from '../src/primitives/hex-ink/hex-ink';

const WEIGHTS = [0.2126, 0.7152, 0.0722];
const channel = (byte) => {
  const c = byte / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => [1, 3, 5].reduce((sum, at, i) => sum + WEIGHTS[i] * channel(parseInt(hex.slice(at, at + 2), 16)), 0);
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const hexOf = (r, g, b) => `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;

describe('K1 hexInk', { tags: ['critical'] }, () => {
  it('picks black text on a light colour and white on a dark one, from three or six digits', () => {
    expect(hexInk('#ffd23f')).toBe('dark');
    expect(hexInk('#fff')).toBe('dark');
    expect(hexInk('#3b1f5c')).toBe('light');
    expect(hexInk('#000')).toBe('light');
    expect(hexInk('#2E8B57')).toBe('dark');
    expect(hexInk('#5C3B9A')).toBe('light');
  });

  it('always lands at 4.5:1 or more against the fill', () => {
    for (let r = 0; r < 256; r += 51) {
      for (let g = 0; g < 256; g += 17) {
        for (let b = 0; b < 256; b += 51) {
          const hex = hexOf(r, g, b);
          const ink = hexInk(hex) === 'dark' ? 0 : 1;
          expect(contrast(luminance(hex), ink), hex).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  it('reads nothing from a value that is not an opaque hex colour', () => {
    expect(hexInk('red')).toBeNull();
    expect(hexInk('#12345678')).toBeNull();
    expect(hexInk('var(--c-primary)')).toBeNull();
  });
});
