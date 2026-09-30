/* @layer tooling-scripts @kind logic */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { CANVAS, LARGE_ICON, MASKABLE_SIZE, OUTPUT_FOLDERS, SPLASH_SIZE } from './app-icons.constants.mjs';
import { appArt, svgOf } from './app-art.mjs';
import { artFile, markArt, sceneArt } from './art.mjs';
import { crisp, ico, icon, render } from './raster.mjs';

const writer = (root) => (path, data) => {
  const file = join(root, 'brand', path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
  return path;
};

const ladder = async (write, art, files, sizes) => {
  const written = sizes.ladder.map((size) => write(files.ladder(size), icon(art, size)));
  if (files.ico) written.push(write(files.ico, await ico(art, sizes.ico)));
  return written;
};

const buildApp = (write, id, art) => [
  write(`${id}/icon/icon.svg`, svgOf(art.iconFile)),
  write(`${id}/icon/png/icon-${LARGE_ICON}.png`, icon(art.icon, LARGE_ICON)),
  write(`${id}/icon/maskable-${MASKABLE_SIZE}.png`, icon(art.maskable, MASKABLE_SIZE)),
  write(`${id}/icon/android/icon-foreground.png`, icon(art.foreground, CANVAS)),
  write(`${id}/icon/android/icon-background.png`, icon(art.background, CANVAS)),
  write(`${id}/splash/splash.svg`, svgOf(art.splash)),
  write(`${id}/splash/splash-${SPLASH_SIZE}.png`, render(svgOf(art.splash))),
];

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
  const written = [write(`${id}.svg`, artFile(mark, brand.name))];
  if (brand.appIcon) written.push(...buildApp(write, id, appArt(brand, mark)));
  if (brand.mascot) written.push(...buildMascot(write, id, brand, loaded));
  const artFor = { icon: () => appArt(brand, mark).icon, mark: () => mark, mascot: () => variantArt(brand.mascot.variants[0], loaded) };
  for (const files of loaded.iconFiles(id)) written.push(...await ladder(write, artFor[files.kind](), files, loaded.sizes));
  return written;
};

export { buildBrand };
