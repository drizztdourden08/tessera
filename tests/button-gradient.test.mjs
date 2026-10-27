/* @layer tooling-scripts @kind test */
import { readTokenSources } from '../scripts/tokens/read-token-sources.mjs';
import { resolveTokens } from '../scripts/tokens/resolve-tokens.mjs';
import { parseColour } from '../scripts/tokens/parse-colour.mjs';
import { relativeLuminance } from '../scripts/tokens/relative-luminance.mjs';
import { luminanceRatio } from '../scripts/tokens/luminance-ratio.mjs';
import { Button } from '../src/primitives/Button';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { createElement as h } from 'react';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const NEED = 4.5;
const { base, palettes } = readTokenSources(ROOT);
const CASES = [{ name: 'default', seeds: [] }, ...Object.entries(palettes).map(([name, seeds]) => ({ name, seeds }))];

const classOf = (props) => /class="([^"]*)"/.exec(renderToString(h(Button, props, 'Download')))[1].split(' ');

describe('a gradient Button', () => {
  it('takes the gradient class on a flat primary button, in place of the toned and solid classes', () => {
    const classes = classOf({ variant: 'primary', fill: 'gradient', size: 'lg' });
    expect(classes).toContain('btn--gradient');
    expect(classes).not.toContain('btn--toned');
    expect(classes).not.toContain('btn--solid');
  });

  it('falls back to solid for the pixel look, for another variant, and for ghost to nothing', () => {
    expect(classOf({ variant: 'primary', fill: 'gradient', look: 'pixel' })).toEqual(expect.arrayContaining(['btn--pixel', 'btn--solid']));
    expect(classOf({ variant: 'danger', fill: 'gradient' })).toContain('btn--solid');
    expect(classOf({ variant: 'ghost', fill: 'gradient' })).not.toContain('btn--gradient');
  });

  it('draws with tokens only, and a reduced motion setting only removes the transition', () => {
    const css = read('src/theme/button-gradient.css');
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b|\d+px|rgb\(|hsl\(/i);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\) \{\s*\.btn\.btn--gradient \{\s*transition: none;\s*\}\s*\}/);
    expect(css).toContain('box-shadow: 0 0 var(--glow-reach-strong) var(--tone-glow-strong);');
  });
});

describe('a wide Button', () => {
  it('takes the wide class from a minimum width token, and stays auto without it', () => {
    expect(classOf({ width: 'wide' })).toContain('btn--wide');
    expect(classOf({ width: 'auto' })).not.toContain('btn--wide');
    expect(classOf({})).not.toContain('btn--wide');
    expect(read('src/primitives/Button/Button.css')).toMatch(/\.btn--wide \{\s*min-inline-size: var\(--control-w-wide\);/);
    expect(read('src/tokens/size.css')).toContain('--control-w-wide: var(--size-336);');
  });
});

describe('the label on a gradient Button', () => {
  it.each(CASES.flatMap(({ name, seeds }) => ['--c-primary-gradient-from', '--c-primary-gradient-to'].map((end) => ({ name, seeds, end }))))(
    '$name: --c-on-primary on $end reaches 4.5:1',
    ({ seeds, end }) => {
      const tokens = resolveTokens([...base, ...seeds]);
      const ink = relativeLuminance(parseColour(tokens.get('--c-on-primary')).rgb);
      const fill = relativeLuminance(parseColour(tokens.get(end)).rgb);
      expect(luminanceRatio(ink, fill)).toBeGreaterThanOrEqual(NEED);
    },
  );
});
