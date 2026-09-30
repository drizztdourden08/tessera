/* @layer tooling-scripts @kind logic */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBrands } from './load-brands.mjs';
import { markContrast } from './mark-contrast.mjs';
import { tokenFiles } from './token-files.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const brands = await loadBrands(ROOT);
const files = tokenFiles(ROOT, brands);
for (const [path, content] of Object.entries(files)) writeFileSync(join(ROOT, path), content);
console.log(`tokens: ${Object.keys(files).join(', ')}`);
for (const app of brands.apps) {
  const ratios = markContrast(readFileSync(join(ROOT, 'brand', `${app}.svg`), 'utf8'), brands.family[app].gradient.stops);
  console.log(`  ${app} mark on its gradient: ${ratios.map((r) => `${r.toFixed(2)}:1`).join(', ')}`);
}
