/* @layer tooling-scripts @kind logic */
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { appArt } from './app-art.mjs';
import { buildApp, ladder } from './app-files.mjs';
import { artFile, markArt } from './art.mjs';
import { rimFraction, rimmedArt } from './rim-art.mjs';

const buildRim = async ({ root, write, loaded }, id, tone) => {
  const brand = loaded.family[id];
  const dir = `${tone}-rim`;
  rmSync(join(root, 'brand', dir, id), { recursive: true, force: true });
  const colour = loaded.rim.colours[tone];
  const base = markArt(brand.mark);
  const artAt = (size) => rimmedArt(base, brand.mark, colour, rimFraction(loaded.rim, size));
  const mark = rimmedArt(base, brand.mark, colour, loaded.rim.ratio);
  const written = [write(`${dir}/${id}.svg`, artFile(mark, brand.name))];
  if (brand.appIcon) written.push(...buildApp(write, `${dir}/${id}`, appArt({ ...brand, appIcon: 'straight' }, mark)));
  for (const files of loaded.iconFiles(id, tone)) written.push(...await ladder(write, artAt, files, loaded.sizes));
  return written;
};

export { buildRim };
