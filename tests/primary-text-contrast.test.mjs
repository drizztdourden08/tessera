/* @layer tooling-scripts @kind test */
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { luminanceRatio } from '../scripts/tokens/luminance-ratio.mjs';
import { parseColour } from '../scripts/tokens/parse-colour.mjs';
import { readTokenSources } from '../scripts/tokens/read-token-sources.mjs';
import { relativeLuminance } from '../scripts/tokens/relative-luminance.mjs';
import { resolveTokens } from '../scripts/tokens/resolve-tokens.mjs';
import { colourOver } from '../scripts/tokens/colour-over.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const { base, palettes } = readTokenSources(ROOT);
const NEED = 4.5;
const BLACK = [0, 0, 0];
const GROUNDS = ['--c-bg', '--c-panel', '--c-surface', '--c-sunken'];

const BXEL_APP = [['--p-primary', '#e0245e'], ['--c-bg', '#070314']];
const CASES = [
  ...Object.entries(palettes).map(([name, seeds]) => ({ name, tokens: resolveTokens([...base, ...seeds]) })),
  { name: 'bxel app, primary #e0245e on #070314', tokens: resolveTokens([...base, ...palettes.bxel, ...BXEL_APP]) },
];

const flat = (tokens, name) => {
  const bg = colourOver(parseColour(tokens.get('--c-bg')), BLACK);
  return name === '--c-bg' ? bg : colourOver(parseColour(tokens.get(name)), bg);
};

const ratio = (tokens, ground) => {
  const under = flat(tokens, ground);
  const ink = colourOver(parseColour(tokens.get('--c-primary-text')), under);
  return luminanceRatio(relativeLuminance(ink), relativeLuminance(under));
};

describe('the primary text colour of every palette', () => {
  it.each(CASES.flatMap(({ name, tokens }) => GROUNDS.map((ground) => ({ name, tokens, ground, shown: ratio(tokens, ground).toFixed(2) }))))(
    '$name: --c-primary-text on $ground reaches 4.5:1 at $shown:1',
    ({ tokens, ground }) => {
      expect(ratio(tokens, ground)).toBeGreaterThanOrEqual(NEED);
    },
  );
});
