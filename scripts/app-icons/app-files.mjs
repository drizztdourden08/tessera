/* @layer tooling-scripts @kind logic */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { CANVAS, LARGE_ICON, MASKABLE_SIZE, SPLASH_SIZE } from './app-icons.constants.mjs';
import { svgOf } from './app-art.mjs';
import { ico, icon, render } from './raster.mjs';

const writer = (root) => (path, data) => {
  const file = join(root, 'brand', path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
  return path;
};

const ladder = async (write, artAt, files, sizes) => {
  const written = sizes.ladder.map((size) => write(files.ladder(size), icon(artAt(size), size)));
  if (files.ico) written.push(write(files.ico, await ico(artAt, sizes.ico)));
  return written;
};

const buildApp = (write, dir, art) => [
  write(`${dir}/icon/icon.svg`, svgOf(art.iconFile)),
  write(`${dir}/icon/png/icon-${LARGE_ICON}.png`, icon(art.icon, LARGE_ICON)),
  write(`${dir}/icon/maskable-${MASKABLE_SIZE}.png`, icon(art.maskable, MASKABLE_SIZE)),
  write(`${dir}/icon/android/icon-foreground.png`, icon(art.foreground, CANVAS)),
  write(`${dir}/icon/android/icon-background.png`, icon(art.background, CANVAS)),
  write(`${dir}/splash/splash.svg`, svgOf(art.splash)),
  write(`${dir}/splash/splash-${SPLASH_SIZE}.png`, render(svgOf(art.splash))),
];

export { buildApp, ladder, writer };
