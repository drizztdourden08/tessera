/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { luminanceRatio } from '../scripts/tokens/luminance-ratio.mjs';
import { parseColour } from '../scripts/tokens/parse-colour.mjs';
import { readTokenSources } from '../scripts/tokens/read-token-sources.mjs';
import { relativeLuminance } from '../scripts/tokens/relative-luminance.mjs';
import { resolveTokens } from '../scripts/tokens/resolve-tokens.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CSS = readFileSync(new URL('../src/theme/button-pixel.css', import.meta.url), 'utf8');
const TEXT_MINIMUM = 4.5;
const TONES = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success'];

const classOf = (props) => /class="([^"]*)"/.exec(renderToString(h(Button, props, 'Start')))[1].split(' ');

const FILLS = [...CSS.matchAll(/--pixel-lit:\s*var\((--[\w-]+)\)/g)].map(([, token]) => token);

const { base, palettes } = readTokenSources(ROOT);

describe('a pixel Button', () => {
  it('takes the pixel class in place of the toned one, in every variant but ghost', () => {
    for (const variant of TONES) {
      const classes = classOf({ look: 'pixel', variant });
      expect(classes, variant).toContain('btn--pixel');
      expect(classes, variant).toContain(`btn--${variant}`);
      expect(classes, variant).not.toContain('btn--toned');
    }
    expect(classOf({ look: 'pixel', variant: 'ghost' })).not.toContain('btn--pixel');
    expect(classOf({ variant: 'primary' })).toContain('btn--toned');
    expect(classOf({ variant: 'primary' })).not.toContain('btn--pixel');
  });

  it('keeps the pixel class while loading and busy', () => {
    const html = renderToString(h(Button, { look: 'pixel', variant: 'secondary', loading: true }, 'Start'));
    expect(classOf({ look: 'pixel', variant: 'secondary', loading: true })).toEqual(expect.arrayContaining(['btn--pixel', 'btn--loading']));
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled=""');
    expect(html).toContain('btn__spinner');
  });

  it('draws its dither with tokens only, as repeating conic gradients at the pixel step', () => {
    expect(CSS).toMatch(/conic-gradient/);
    expect(CSS).toContain('var(--pixel-step)');
    expect(CSS).not.toMatch(/#[0-9a-f]{3,8}\b|\d+px|rgb\(|hsl\(/i);
  });

  it.each(Object.entries(palettes))('keeps text readable on every fill the label sits on in the %s palette', (_palette, seeds) => {
    expect(FILLS.length).toBeGreaterThanOrEqual(2);
    const tokens = resolveTokens([...base, ...seeds]);
    const lum = (name) => relativeLuminance(parseColour(tokens.get(name)).rgb);
    for (const tone of TONES) {
      const swap = (token) => token.replace('--tone-dim', `--c-${tone}-dim`);
      for (const token of FILLS) {
        const ratio = luminanceRatio(lum(`--c-${tone}-bright`), lum(swap(token)));
        expect(ratio, `${tone} on ${token}`).toBeGreaterThanOrEqual(TEXT_MINIMUM);
      }
    }
  });

  it.each(Object.entries(palettes))('keeps the on-colour text readable on a solid fill in the %s palette', (_palette, seeds) => {
    const tokens = resolveTokens([...base, ...seeds]);
    const lum = (name) => relativeLuminance(parseColour(tokens.get(name)).rgb);
    for (const tone of TONES) {
      expect(luminanceRatio(lum(`--c-on-${tone}`), lum(`--c-${tone}`)), tone).toBeGreaterThanOrEqual(TEXT_MINIMUM);
    }
  });
});
