/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { backdropGradientCss } from '../src/brand/backdrop-gradient-css';
import { brandGradientCss } from '../src/brand/brand-gradient-css';
import { BRAND_APPS, BRAND_FAMILY } from '../src/brand/family.constants';
import { BRAND_RIM } from '../src/brand/rim.constants';
import { evaluateColourMix } from '../scripts/tokens/evaluate-colour-mix.mjs';
import { luminanceRatio } from '../scripts/tokens/luminance-ratio.mjs';
import { parseColour } from '../scripts/tokens/parse-colour.mjs';
import { relativeLuminance } from '../scripts/tokens/relative-luminance.mjs';
import { tokenFiles } from '../scripts/tokens/token-files.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BRANDS = { family: BRAND_FAMILY, apps: BRAND_APPS, gradientCss: brandGradientCss, backdropCss: backdropGradientCss, rim: BRAND_RIM };
const FILES = tokenFiles(ROOT, BRANDS);
const committed = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const OPAQUE_HEX = /^#[0-9a-f]{6}$/;

describe('generated token files', () => {
  it.each(Object.keys(FILES))('%s is what pnpm tokens writes from the CSS and the brand data', (path) => {
    expect(committed(path)).toBe(FILES[path]);
  });

  it('splash-tokens.css holds literal values only', () => {
    expect(FILES['splash-tokens.css']).not.toMatch(/var\(|color-mix\(|@import/);
  });

  it('tokens.json gives every theme colour as opaque hex', () => {
    const { theme, palettes } = JSON.parse(FILES['tokens.json']);
    const colours = [theme.dark, ...Object.values(palettes).map((palette) => palette.dark)].flatMap(Object.values);
    expect(colours.every((colour) => OPAQUE_HEX.test(colour))).toBe(true);
  });

  it('tokens.json gives each brand gradient in the from, to, via order Brock reads', () => {
    const { brands } = JSON.parse(FILES['tokens.json']);
    for (const app of BRAND_APPS) {
      const [from, via, to] = BRAND_FAMILY[app].gradient.stops;
      expect(brands[app].gradient).toEqual(to === undefined ? [from, via] : [from, to, via]);
      expect(brands[app].gradient.every((stop) => OPAQUE_HEX.test(stop))).toBe(true);
    }
  });
});

const contrastOf = (a, b) => luminanceRatio(relativeLuminance(parseColour(a).rgb), relativeLuminance(parseColour(b).rgb));
const TEXT_MINIMUM = 4.5;

describe('the text colours', () => {
  const { palettes } = JSON.parse(FILES['tokens.json']);

  it.each(Object.keys(palettes))('%s keeps muted and faint text readable on the main ground, faint under muted under dim', (palette) => {
    const { bg, textDim, textMuted, textFaint } = palettes[palette].dark;
    expect(contrastOf(textFaint, bg)).toBeGreaterThanOrEqual(TEXT_MINIMUM);
    expect(contrastOf(textMuted, bg)).toBeGreaterThan(contrastOf(textFaint, bg));
    expect(contrastOf(textDim, bg)).toBeGreaterThan(contrastOf(textMuted, bg));
  });

  it.each(Object.keys(palettes))('%s keeps faint text readable on the surface too', (palette) => {
    const { surface, textFaint } = palettes[palette].dark;
    expect(contrastOf(textFaint, surface)).toBeGreaterThanOrEqual(TEXT_MINIMUM);
  });

  it('keeps the old faint grey as a disabled text colour under the readable ones', () => {
    const css = committed('src/tokens/canonical.css');
    expect(css).toContain('--c-text-disabled: var(--p-tertiary-800);');
    expect(css).toContain('--c-text-faint:    var(--p-text-faint, var(--p-tertiary-600));');
  });
});

describe('the brand backdrops', () => {
  it('gives each brand its own backdrop in literal colours', () => {
    const { brands } = JSON.parse(FILES['tokens.json']);
    const backdrops = BRAND_APPS.map((app) => brands[app].backdrop);
    expect(backdrops.every((css) => css.startsWith('radial-gradient(') && !/var\(|color-mix\(/.test(css))).toBe(true);
    expect(new Set(backdrops).size).toBe(backdrops.length);
  });

  it('gives each palette the backdrop of its brand', () => {
    const { brands, palettes } = JSON.parse(FILES['tokens.json']);
    for (const [palette, entry] of Object.entries(palettes)) expect(entry.backdrop).toBe(brands[palette].backdrop);
  });

  it('builds every glow from the brand colours, fading to clear at its edge', () => {
    for (const app of BRAND_APPS) {
      const glows = backdropGradientCss(BRAND_FAMILY[app].backdrop).split('radial-gradient(').slice(1);
      expect(glows.every((glow) => /#[0-9a-f]{6}00 100%\)/.test(glow))).toBe(true);
    }
  });
});

describe('color-mix maths', () => {
  it.each([
    ['color-mix(in oklch, #8a8a96, #fff 22%)', '#aca0a3'],
    ['color-mix(in oklab, #7c4dff 45%, #fff)', '#bdb6ff'],
    ['color-mix(in oklab, #e5556e 16%, #17171a)', '#342226'],
    ['color-mix(in srgb, #fff 6%, transparent)', '#ffffff0f'],
  ])('%s computes to %s, as Chromium draws it', (value, hex) => {
    expect(evaluateColourMix(value)).toBe(hex);
  });
});
