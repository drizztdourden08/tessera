/* @layer tooling-scripts @kind logic */
import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildBrand } from './build-brand.mjs';
import { loadBrandArt } from './load-brand-art.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const loaded = await loadBrandArt(ROOT);
const counts = [];
for (const id of loaded.apps) {
  rmSync(join(ROOT, 'brand', `${id}-mascot.svg`), { force: true });
  counts.push(`${id} (${(await buildBrand(ROOT, id, loaded)).length})`);
}
console.log(`app icons: ${counts.join(', ')}`);
