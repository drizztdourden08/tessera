/* @layer tooling-scripts @kind logic */
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { GROUNDS, OUTPUT_FOLDERS } from './app-icons.constants.mjs';
import { appArt } from './app-art.mjs';
import { buildApp, ladder, writer } from './app-files.mjs';
import { artFile, markArt, sceneArt } from './art.mjs';
import { buildGround } from './build-ground.mjs';
import { buildRim } from './build-rim.mjs';
import { groundArt } from './ground-art.mjs';
import { crisp } from './raster.mjs';

const variantArt = (variant, loaded) => {
  const scene = variant.compose();
  return sceneArt(scene, loaded.sceneMarkup(scene, { idPrefix: variant.id }));
};

const buildMascot = (write, id, brand, loaded) => brand.mascot.variants.flatMap((variant) => {
  const art = variantArt(variant, loaded);
  const label = variant === brand.mascot.variants[0] ? brand.mascot.name : `${brand.mascot.name}, ${variant.name}`;
  return [
    write(`${id}/mascot/${variant.id}.svg`, artFile(art, label)),
    ...loaded.sizes.crisp.map((scale) => write(`${id}/mascot/${variant.id}-${scale}x.png`, crisp(art, scale))),
  ];
});

const buildBrand = async (root, id, loaded) => {
  const brand = loaded.family[id];
  const write = writer(root);
  for (const folder of OUTPUT_FOLDERS) rmSync(join(root, 'brand', id, folder), { recursive: true, force: true });
  const mark = markArt(brand.mark);
  const dark = groundArt(brand, loaded, 'dark');
  const written = [write(`${id}.svg`, artFile(mark, brand.name))];
  if (brand.appIcon) written.push(...buildApp(write, id, appArt(brand, mark, dark.mark)));
  if (brand.mascot) written.push(...buildMascot(write, id, brand, loaded));
  const artFor = { icon: () => appArt(brand, mark).icon, mark: () => mark, mascot: () => variantArt(brand.mascot.variants[0], loaded) };
  for (const files of loaded.iconFiles(id)) {
    const art = artFor[files.kind]();
    written.push(...await ladder(write, () => art, files, loaded.sizes));
  }
  for (const tone of loaded.rimTones) written.push(...await buildRim({ root, write, loaded }, id, tone));
  for (const ground of GROUNDS) {
    written.push(...await buildGround({ root, write, loaded }, id, ground, groundArt(brand, loaded, ground)));
  }
  return written;
};

export { buildBrand };
