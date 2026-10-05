/* @layer tooling-scripts @kind logic */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import wawoff2 from 'wawoff2';
import { TRUETYPE_FACES } from './fonts.constants.mjs';

const FONTS = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'fonts');

const sizes = [];
for (const face of TRUETYPE_FACES) {
  const truetype = await wawoff2.decompress(readFileSync(join(FONTS, `${face}.woff2`)));
  writeFileSync(join(FONTS, `${face}.ttf`), truetype);
  sizes.push(`${face}.ttf (${truetype.length} bytes)`);
}
console.log(`truetype fonts: ${sizes.join(', ')}`);
