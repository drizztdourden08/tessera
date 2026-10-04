/* @layer tooling-scripts @kind logic */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { TESSERA_ROOT } from '../guide/tessera-root.constants.mjs';
import { blockOf } from './block-of.mjs';
import { CLASS_NAME, COMMENT, SELECTOR_PRELUDE } from './stylelint-rules.constants.mjs';

const cache = new Map();

const cssFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const path = join(dir, entry.name);
  if (entry.isDirectory()) return cssFiles(path);
  return entry.name.endsWith('.css') ? [path] : [];
});

const blocksIn = (text) => [...text.replace(COMMENT, '').matchAll(SELECTOR_PRELUDE)]
  .flatMap((prelude) => [...prelude[1].matchAll(CLASS_NAME)].map((found) => blockOf(found[1])));

const tesseraBlocks = (root = TESSERA_ROOT) => {
  if (!cache.has(root)) cache.set(root, new Set(cssFiles(join(root, 'src')).flatMap((file) => blocksIn(readFileSync(file, 'utf8')))));
  return cache.get(root);
};

export { tesseraBlocks };
