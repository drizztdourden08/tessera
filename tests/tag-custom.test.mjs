/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tag } from '../src/primitives/Tag';
import { tagInk } from '../src/primitives/Tag/behavior/tag-ink';
import { optionLook } from '../src/primitives/TagPicker/behavior/option-look';

const WEIGHTS = [0.2126, 0.7152, 0.0722];
const channel = (byte) => {
  const c = byte / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => [1, 3, 5].reduce((sum, at, i) => sum + WEIGHTS[i] * channel(parseInt(hex.slice(at, at + 2), 16)), 0);
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const hexOf = (r, g, b) => `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;

describe('tagInk', () => {
  it('picks black text on a light colour and white on a dark one, from three or six digits', () => {
    expect(tagInk('#ffd23f')).toBe('dark');
    expect(tagInk('#fff')).toBe('dark');
    expect(tagInk('#3b1f5c')).toBe('light');
    expect(tagInk('#000')).toBe('light');
    expect(tagInk('#2E8B57')).toBe('dark');
    expect(tagInk('#5C3B9A')).toBe('light');
  });

  it('always lands at 4.5:1 or more against the fill', () => {
    for (let r = 0; r < 256; r += 51) {
      for (let g = 0; g < 256; g += 17) {
        for (let b = 0; b < 256; b += 51) {
          const hex = hexOf(r, g, b);
          const ink = tagInk(hex) === 'dark' ? 0 : 1;
          expect(contrast(luminance(hex), ink), hex).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  it('reads nothing from a value that is not an opaque hex colour', () => {
    expect(tagInk('red')).toBeNull();
    expect(tagInk('#12345678')).toBeNull();
    expect(tagInk('var(--c-primary)')).toBeNull();
  });
});

describe('a custom Tag', () => {
  it('fills with the colour the app passes and takes the ink class', () => {
    const html = renderToString(h(Tag, { variant: 'custom', color: '#3b1f5c' }, 'Ganon'));
    expect(html).toMatch(/^<span class="tag tag--custom tag--ink-light" style="--tag-paint:#3b1f5c">/);
  });

  it('draws as a neutral tag when the colour cannot be read', () => {
    const html = renderToString(h(Tag, { variant: 'custom', color: '#nope' }, 'Navi'));
    expect(html).toMatch(/^<span class="tag tag--normal tag--neutral">/);
  });

  it('keeps its colour as a TagPicker option, and as a toggle', () => {
    expect(optionLook({ variant: 'custom', color: '#ffd23f' })).toEqual({ variant: 'custom', color: '#ffd23f' });
    const html = renderToString(h(Tag, { variant: 'custom', color: '#ffd23f', selected: true, onSelect: () => undefined }, 'Midna'));
    expect(html).toContain('tag tag--custom tag--ink-dark tag--selectable tag--selected');
    expect(html).toContain('style="--tag-paint:#ffd23f"');
  });
});
