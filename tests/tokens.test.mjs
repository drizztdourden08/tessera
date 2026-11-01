/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { backdropGradientCss } from '../src/brand/backdrop-gradient-css';
import { BRAND_APPS, BRAND_FAMILY } from '../src/brand/family.constants';
import { evaluateColourMix } from '../scripts/tokens/evaluate-colour-mix.mjs';

describe('K1 the brand backdrops', { tags: ['critical'] }, () => {
  it('builds every glow from the brand colours, fading to clear at its edge', () => {
    for (const app of BRAND_APPS) {
      const glows = backdropGradientCss(BRAND_FAMILY[app].backdrop).split('radial-gradient(').slice(1);
      expect(glows.every((glow) => /#[0-9a-f]{6}00 100%\)/.test(glow))).toBe(true);
    }
  });
});

describe('K1 color-mix maths', { tags: ['critical'] }, () => {
  it.each([
    ['color-mix(in oklch, #8a8a96, #fff 22%)', '#aca0a3'],
    ['color-mix(in oklab, #7c4dff 45%, #fff)', '#bdb6ff'],
    ['color-mix(in oklab, #e5556e 16%, #17171a)', '#342226'],
    ['color-mix(in srgb, #fff 6%, transparent)', '#ffffff0f'],
  ])('%s computes to %s, as Chromium draws it', (value, hex) => {
    expect(evaluateColourMix(value)).toBe(hex);
  });
});
