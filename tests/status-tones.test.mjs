/* @layer tooling-scripts @kind test */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { declarationsOf } from '../scripts/tokens/declarations-of.mjs';
import { readTokenSources } from '../scripts/tokens/read-token-sources.mjs';
import { resolveTokens } from '../scripts/tokens/resolve-tokens.mjs';
import { statusContrast } from '../scripts/tokens/status-contrast.mjs';
import { STATUS_SEEDS, STATUS_TONES } from '../scripts/tokens/status-contrast.constants.mjs';
import { PALETTES_DIR } from '../scripts/tokens/tokens.constants.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const { base, palettes } = readTokenSources(ROOT);
const TOKENS = Object.entries(palettes).map(([palette, seeds]) => [palette, resolveTokens([...base, ...seeds])]);
const PALETTE_FILES = ['src/tokens/palette.css', ...readdirSync(new URL(`../${PALETTES_DIR}`, import.meta.url)).filter((file) => file.endsWith('.css')).map((file) => `${PALETTES_DIR}/${file}`)];

const CASES = TOKENS.flatMap(([palette, tokens]) => statusContrast(tokens).map((pair) => ({ palette, ...pair, shown: pair.ratio.toFixed(2) })));

const STATUS_RULE = new RegExp(`(?:--|=['"]?)(?:${STATUS_TONES.join('|')})\\b`);
const ACCENT = /var\(--c-(?:primary|secondary)[\w-]*\)/;
const RULE = /([^{}]+)\{([^{}]*)\}/g;

const cssFiles = () => [
  ...readdirSync(new URL('../src', import.meta.url), { recursive: true }).filter((file) => file.endsWith('.css')).map((file) => `src/${file.replace(/\\/g, '/')}`),
  'splash.css',
];

const statusRulesOnAccents = () => cssFiles().flatMap((file) =>
  [...read(file).replace(/\/\*[\s\S]*?\*\//g, '').matchAll(RULE)]
    .filter(([, selector, body]) => STATUS_RULE.test(selector) && ACCENT.test(body))
    .map(([, selector]) => `${file}: ${selector.trim()}`));

describe('the status tones of every palette', () => {
  it.each(PALETTE_FILES)('%s sets its own success, warning, danger and info seeds', (path) => {
    const seeds = new Map(declarationsOf(read(path), (selector) => selector === ':root' || selector.startsWith('[data-palette=')));
    expect(STATUS_SEEDS.filter((seed) => !seeds.has(seed))).toEqual([]);
  });

  it.each(TOKENS.map(([palette, tokens]) => ({ palette, tokens })))('$palette: each status tone is its own colour, apart from primary and secondary', ({ tokens }) => {
    const colours = STATUS_TONES.map((tone) => tokens.get(`--c-${tone}`));
    expect(new Set(colours).size).toBe(STATUS_TONES.length);
    expect(colours).not.toContain(tokens.get('--c-primary'));
    expect(colours).not.toContain(tokens.get('--c-secondary'));
  });

  it.each(CASES)('$palette: $use, $ink on $under, reaches $need:1 at $shown:1', ({ ratio, need }) => {
    expect(ratio).toBeGreaterThanOrEqual(need);
  });
});

describe('parts that mean a status', () => {
  it('draw a success, warning, danger or info rule from the status tokens, never primary or secondary', () => {
    expect(statusRulesOnAccents()).toEqual([]);
  });
});
