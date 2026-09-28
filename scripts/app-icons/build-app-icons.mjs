/* @layer tooling-scripts @kind logic */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';
import { APPS, ICO_SIZES, PNG_SIZES, SPLASH_GROUND, SPLASH_SIZE } from './app-icons.constants.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CANVAS = 1024;

const markOf = (id) => {
  const svg = readFileSync(join(ROOT, 'brand', `${id}.svg`), 'utf8');
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? '0 0 16 16';
  const crisp = svg.includes('crispEdges') ? ' shape-rendering="crispEdges"' : '';
  const body = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>[\s\S]*?<\/title>/, '');
  return { viewBox, crisp, body };
};

const placed = (mark, scale, size = CANVAS) => {
  const edge = size * scale;
  const at = (size - edge) / 2;
  return `<svg x="${at}" y="${at}" width="${edge}" height="${edge}" viewBox="${mark.viewBox}"${mark.crisp}>${mark.body}</svg>`;
};

const canvas = (inner, size = CANVAS) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${inner}</svg>`;

const artFor = (app, mark) => ({
  icon: canvas(`<rect width="${CANVAS}" height="${CANVAS}" rx="${CANVAS * 0.2}" fill="${app.tile}"/>${placed(mark, 0.72)}`),
  maskable: canvas(`<rect width="${CANVAS}" height="${CANVAS}" fill="${app.tile}"/>${placed(mark, 0.6)}`),
  foreground: canvas(placed(mark, 0.56)),
  background: canvas(`<rect width="${CANVAS}" height="${CANVAS}" fill="${app.tile}"/>`),
  splash: canvas(`<rect width="${SPLASH_SIZE}" height="${SPLASH_SIZE}" fill="${SPLASH_GROUND}"/>${placed(mark, 0.24, SPLASH_SIZE)}`, SPLASH_SIZE),
});

const png = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();

const write = (path, data) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
};

const buildApp = async (app) => {
  const art = artFor(app, markOf(app.id));
  const out = join(ROOT, 'brand', app.id);
  write(join(out, 'icon', 'icon.svg'), art.icon);
  for (const size of PNG_SIZES) write(join(out, 'icon', 'png', `icon-${size}.png`), png(art.icon, size));
  write(join(out, 'icon', 'icon.ico'), await pngToIco(ICO_SIZES.map((size) => png(art.icon, size))));
  write(join(out, 'icon', 'maskable-512.png'), png(art.maskable, 512));
  write(join(out, 'icon', 'android', 'icon-foreground.png'), png(art.foreground, CANVAS));
  write(join(out, 'icon', 'android', 'icon-background.png'), png(art.background, CANVAS));
  write(join(out, 'splash', 'splash.svg'), art.splash);
  write(join(out, 'splash', `splash-${SPLASH_SIZE}.png`), png(art.splash, SPLASH_SIZE));
  return app.id;
};

const built = [];
for (const app of APPS) built.push(await buildApp(app));
console.log(`app icons: ${built.join(', ')}`);
