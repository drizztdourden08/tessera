/* @layer tooling-scripts @kind test */
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BRAND_APPS, BRAND_FAMILY } from '../src/brand/family.constants';
import { groundPaths } from '../src/brand/ground-paths';
import { declarationsOf } from '../scripts/tokens/declarations-of.mjs';
import { ruleDeclarations } from '../scripts/tokens/rule-declarations.mjs';
import { splashContrast } from '../scripts/tokens/splash-contrast.mjs';
import { splashMarkContrast } from '../scripts/tokens/splash-mark-contrast.mjs';
import { SPLASH_GRADIENT } from '../scripts/tokens/splash-contrast.constants.mjs';
import { DEFAULT_PALETTE, PALETTES_DIR } from '../scripts/tokens/tokens.constants.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const SPLASH_CSS = read('splash.css');
const TOKENS_CSS = read('splash-tokens.css');
const PALETTE_FILES = readdirSync(new URL(`../${PALETTES_DIR}`, import.meta.url)).filter((file) => file.endsWith('.css'));
const PALETTES = [DEFAULT_PALETTE, ...PALETTE_FILES.map((file) => file.replace(/\.css$/, ''))];
const ROOT_TOKENS = declarationsOf(TOKENS_CSS, (selector) => selector === ':root');

const tokensOf = (palette) =>
  new Map([...ROOT_TOKENS, ...declarationsOf(TOKENS_CSS, (selector) => selector === `[data-palette="${palette}"]`)]);

const CASES = PALETTES.flatMap((palette) => splashContrast(SPLASH_CSS, tokensOf(palette)).map(({ part, ratio, need }) => ({ palette, part, shown: ratio.toFixed(2), ratio, need })));

const GRAPHIC = 3;
const GRADIENT_SEEDS = ['--p-gradient-light-from', '--p-gradient-light-to', '--p-gradient-dark-from', '--p-gradient-dark-to'];

const MARK_CASES = BRAND_APPS.flatMap((app) => {
  const palette = app === 'tessera' ? DEFAULT_PALETTE : app;
  const shapes = splashMarkContrast(groundPaths(BRAND_FAMILY[app].mark.paths, 'dark'), tokensOf(palette));
  return shapes.map(({ ink, ratio }, shape) => ({ app, shape: shape + 1, ink, shown: ratio.toFixed(2), ratio }));
});

describe('the splash on its dark gradient', () => {
  it('paints the dark gradient pair behind the page', () => {
    const background = ruleDeclarations(SPLASH_CSS, [SPLASH_GRADIENT.selector]).get('background');
    expect(background).toContain(`var(${SPLASH_GRADIENT.from})`);
    expect(background).toContain(`var(${SPLASH_GRADIENT.to})`);
    expect(background).not.toContain('radial-gradient');
  });

  it.each(['palette.css', ...PALETTE_FILES])('the %s palette sets its own light and dark gradient pairs', (file) => {
    const path = file === 'palette.css' ? 'src/tokens/palette.css' : `${PALETTES_DIR}/${file}`;
    const seeds = new Map(declarationsOf(read(path), (selector) => selector === ':root' || selector.startsWith('[data-palette=')));
    expect(GRADIENT_SEEDS.every((seed) => seeds.has(seed))).toBe(true);
  });

  it.each(CASES)('$palette: the $part reaches AA on every point of the gradient, $shown:1 at the lowest', ({ ratio, need }) => {
    expect(ratio).toBeGreaterThanOrEqual(need);
  });

  it.each(MARK_CASES)('$app mark, shape $shape in $ink: 3:1 on every point of its gradient, $shown:1 at the lowest', ({ ratio }) => {
    expect(ratio).toBeGreaterThanOrEqual(GRAPHIC);
  });
});
