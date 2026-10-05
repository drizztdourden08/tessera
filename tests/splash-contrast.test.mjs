/* @layer tooling-scripts @kind test */
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BRAND_APPS, BRAND_FAMILY } from '../src/brand/family.constants';
import { groundLook } from '../src/brand/ground-look';
import { BRAND_RIM } from '../src/brand/rim.constants';
import { declarationsOf } from '../scripts/tokens/declarations-of.mjs';
import { ruleDeclarations } from '../scripts/tokens/rule-declarations.mjs';
import { splashContrast } from '../scripts/tokens/splash-contrast.mjs';
import { splashMarkContrast } from '../scripts/tokens/splash-mark-contrast.mjs';
import { GROUND_GRADIENTS, SPLASH_GRADIENT } from '../scripts/tokens/splash-contrast.constants.mjs';
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

const OUTLINE_DRAWN_INTO_THE_ART = { rotp: '#000000' };

const KEPT_AS_DRAWN_WITH_ITS_OUTLINE_UNDER_3 = [{ app: 'rotp', ground: 'dark' }];

const isKept = (app, ground) => KEPT_AS_DRAWN_WITH_ITS_OUTLINE_UNDER_3.some((kept) => kept.app === app && kept.ground === ground);

const markEdges = (app, ground) => {
  const { paths, outline } = groundLook(BRAND_FAMILY[app].mark, ground);
  if (outline) return { edge: 'outline', paths: [{ ink: BRAND_RIM.colours[outline] }] };
  const drawn = OUTLINE_DRAWN_INTO_THE_ART[app];
  return drawn && !isKept(app, ground) ? { edge: 'drawn outline', paths: [{ ink: drawn }] } : { edge: 'shape', paths };
};

const MARK_GROUNDS = BRAND_APPS.flatMap((app) => Object.keys(GROUND_GRADIENTS).map((ground) => {
  const tokens = tokensOf(app === 'tessera' ? DEFAULT_PALETTE : app);
  const { edge, paths } = markEdges(app, ground);
  return { app, ground, edge, shapes: splashMarkContrast(paths, tokens, GROUND_GRADIENTS[ground]) };
}));

const shown = (ratio) => ratio.toFixed(2);

const MARK_CASES = MARK_GROUNDS.filter(({ app, ground }) => !isKept(app, ground)).flatMap(({ app, ground, edge, shapes }) =>
  shapes.map(({ ink, ratio }, at) => ({ app, ground, edge: `${edge === 'shape' ? `shape ${at + 1}` : edge} in ${ink}`, shown: shown(ratio), ratio })));

const KEPT_CASES = MARK_GROUNDS.filter(({ app, ground }) => isKept(app, ground)).map(({ app, ground, shapes }) => {
  const ratios = shapes.map(({ ratio }) => ratio);
  return { app, ground, lowest: shown(Math.min(...ratios)), highest: Math.max(...ratios), shownHighest: shown(Math.max(...ratios)) };
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
});

describe('each brand mark on the light and the dark gradient of its palette', () => {
  it.each(MARK_CASES)('$app mark on the $ground gradient, $edge: 3:1 on every point, $shown:1 at the lowest', ({ ratio }) => {
    expect(ratio).toBeGreaterThanOrEqual(GRAPHIC);
  });

  it.each(KEPT_CASES)('$app mark on the $ground gradient, kept as drawn: its fill reads at $shownHighest:1, its lowest shape is $lowest:1', ({ highest }) => {
    expect(highest).toBeGreaterThanOrEqual(GRAPHIC);
  });
});
