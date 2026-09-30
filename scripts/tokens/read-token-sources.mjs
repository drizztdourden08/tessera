/* @layer tooling-scripts @kind logic */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { declarationsOf } from './declarations-of.mjs';
import { DEFAULT_PALETTE, PALETTES_DIR, TOKENS_INDEX } from './tokens.constants.mjs';

const IMPORT = /@import url\('\.\/([\w-]+\.css)'\);/g;

const isRoot = (selector) => selector === ':root';
const isPalette = (selector) => selector.startsWith('[data-palette=');

const readTokenSources = (root) => {
  const index = join(root, TOKENS_INDEX);
  const files = [...readFileSync(index, 'utf8').matchAll(IMPORT)].map(([, file]) => join(dirname(index), file));
  const base = files.flatMap((file) => declarationsOf(readFileSync(file, 'utf8'), isRoot));
  const themes = readdirSync(join(root, PALETTES_DIR)).filter((file) => file.endsWith('.css')).sort();
  const palettes = { [DEFAULT_PALETTE]: [] };
  for (const file of themes) palettes[file.replace(/\.css$/, '')] = declarationsOf(readFileSync(join(root, PALETTES_DIR, file), 'utf8'), isPalette);
  return { base, palettes };
};

export { readTokenSources };
