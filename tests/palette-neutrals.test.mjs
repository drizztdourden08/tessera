/* @layer tooling-scripts @kind test */
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { colourOver } from '../scripts/tokens/colour-over.mjs';
import { parseColour } from '../scripts/tokens/parse-colour.mjs';
import { readTokenSources } from '../scripts/tokens/read-token-sources.mjs';
import { relativeLuminance } from '../scripts/tokens/relative-luminance.mjs';
import { resolveTokens } from '../scripts/tokens/resolve-tokens.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const { base, palettes } = readTokenSources(ROOT);
const RESOLVED = Object.fromEntries(Object.entries(palettes).map(([palette, seeds]) => [palette, resolveTokens([...base, ...seeds])]));
const SEEDS = Object.fromEntries(Object.entries(palettes).map(([palette, seeds]) => [palette, new Map(seeds)]));

const NEUTRAL_SEEDS = {
  '--p-bg': '--c-bg',
  '--p-panel': '--c-panel',
  '--p-surface-fill': '--c-surface',
  '--p-sunken': '--c-sunken',
  '--p-border': '--c-border',
  '--p-border-strong': '--c-border-strong',
  '--p-chrome': '--c-chrome',
  '--p-chrome-border': '--c-chrome-border',
  '--p-text': '--c-text',
  '--p-text-dim': '--c-text-dim',
  '--p-text-muted': '--c-text-muted',
  '--p-text-faint': '--c-text-faint',
};

const TEXT = ['--c-text', '--c-text-muted', '--c-text-faint'];
const GROUNDS = ['--c-bg', '--c-panel', '--c-surface', '--c-sunken', '--c-chrome'];
const TEXT_NEED = 4.5;

const ratioOf = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const luminanceOf = (tokens, name, under) => relativeLuminance(colourOver(parseColour(tokens.get(name)), under));
const flat = (tokens, name) => colourOver(parseColour(tokens.get(name)), colourOver(parseColour(tokens.get('--c-bg')), [0, 0, 0]));

const PAIRS = Object.entries(RESOLVED).flatMap(([palette, tokens]) =>
  TEXT.flatMap((ink) => GROUNDS.map((ground) => {
    const under = flat(tokens, ground);
    const ratio = ratioOf(luminanceOf(tokens, ink, under), relativeLuminance(under));
    return { palette, ink, ground, ratio, shown: ratio.toFixed(2) };
  })));

describe('the optional neutral seeds of a palette', () => {
  it.each(Object.entries(NEUTRAL_SEEDS))('%s, when a palette sets it, is the value of %s', (seed, role) => {
    const setters = Object.entries(SEEDS).filter(([, seeds]) => seeds.has(seed));
    for (const [palette, seeds] of setters) expect(parseColour(RESOLVED[palette].get(role))).toEqual(parseColour(seeds.get(seed)));
  });

  it('a palette that sets none keeps the chrome on the surface and its border', () => {
    for (const [palette, seeds] of Object.entries(SEEDS)) {
      if (Object.keys(NEUTRAL_SEEDS).some((seed) => seeds.has(seed))) continue;
      expect(RESOLVED[palette].get('--c-chrome')).toBe(RESOLVED[palette].get('--c-surface'));
      expect(RESOLVED[palette].get('--c-chrome-border')).toBe(RESOLVED[palette].get('--c-border'));
    }
  });

  it('a palette that sets a chrome seed paints the chrome with it', () => {
    const seeds = new Map([...SEEDS.tessera, ['--p-chrome', '#101012'], ['--p-chrome-border', '#303034']]);
    const tokens = resolveTokens([...base, ...seeds]);
    expect(tokens.get('--c-chrome')).toBe('#101012');
    expect(tokens.get('--c-chrome-border')).toBe('#303034');
  });

  it.each(PAIRS)('$palette: $ink on $ground reaches AA, $shown:1', ({ ratio }) => {
    expect(ratio).toBeGreaterThanOrEqual(TEXT_NEED);
  });
});
