/* @layer tooling-scripts @kind entry */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { declarationsOf } from './declarations-of.mjs';
import { readTokenSources } from './read-token-sources.mjs';
import { resolveTokens } from './resolve-tokens.mjs';
import { splashContrast } from './splash-contrast.mjs';
import { splashMarkCases } from './splash-mark-cases.mjs';
import { statusContrast } from './status-contrast.mjs';
import { DEFAULT_PALETTE, PALETTES_DIR, SPLASH_CSS } from './tokens.constants.mjs';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

const main = async () => {
  const splash = read('splash.css');
  const splashTokens = read(SPLASH_CSS);
  const rootTokens = declarationsOf(splashTokens, (selector) => selector === ':root');
  const palettes = [DEFAULT_PALETTE, ...readdirSync(join(root, PALETTES_DIR)).filter((file) => file.endsWith('.css')).map((file) => file.replace(/\.css$/, ''))];
  const tokensOf = (palette) => new Map([...rootTokens, ...declarationsOf(splashTokens, (selector) => selector === `[data-palette="${palette}"]`)]);

  const splashCases = palettes.flatMap((palette) => splashContrast(splash, tokensOf(palette))
    .map(({ part, ratio, need }) => ({ label: `splash, ${palette}: the ${part}`, ratio, need })));

  const sources = readTokenSources(root);
  const statusCases = Object.entries(sources.palettes).flatMap(([palette, seeds]) => statusContrast(resolveTokens([...sources.base, ...seeds]))
    .map(({ use, ink, under, ratio, need }) => ({ label: `status, ${palette}: ${use}, ${ink} on ${under}`, ratio, need })));

  const cases = [...splashCases, ...await splashMarkCases(root, tokensOf), ...statusCases];
  const failed = cases.filter(({ ratio, need }) => ratio < need);
  failed.forEach(({ label, ratio, need }) => console.log(`${label}: ${ratio.toFixed(2)}:1, needs ${need}:1`));
  console.log(failed.length === 0 ? `Contrast: ${cases.length} splash, mark and status pairs pass.` : `Contrast: ${failed.length} of ${cases.length} pairs fail.`);
  process.exitCode = failed.length === 0 ? 0 : 1;
};

await main();
