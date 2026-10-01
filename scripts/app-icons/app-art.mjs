/* @layer tooling-scripts @kind logic */
import { CANVAS, FOREGROUND_SCALE, MASKABLE_SCALE, SPLASH_GROUND, SPLASH_SCALE, SPLASH_SIZE, TILE_RADIUS, TILE_SCALE } from './app-icons.constants.mjs';
import { crispAttr } from './art.mjs';

const placed = (art, scale, size = CANVAS) => {
  const edge = size * scale;
  const at = (size - edge) / 2;
  return `<svg x="${at}" y="${at}" width="${edge}" height="${edge}" viewBox="${art.viewBox}"${crispAttr(art)}>${art.body}</svg>`;
};

const square = (body, size = CANVAS) => ({ viewBox: `0 0 ${size} ${size}`, x: 0, y: 0, w: size, h: size, pixelArt: false, body });

const svgOf = (art) => `<svg xmlns="http://www.w3.org/2000/svg" width="${art.w}" height="${art.h}" viewBox="${art.viewBox}">${art.body}</svg>\n`;

const iconArt = (brand, mark) => (brand.appIcon === 'tile'
  ? square(`<rect width="${CANVAS}" height="${CANVAS}" rx="${CANVAS * TILE_RADIUS}" fill="${brand.tile}"/>${placed(mark, TILE_SCALE)}`)
  : mark);

const groundOf = (brand, size, fill) => (brand.appIcon === 'tile' ? `<rect width="${size}" height="${size}" fill="${fill}"/>` : '');

const appArt = (brand, mark) => ({
  icon: iconArt(brand, mark),
  iconFile: brand.appIcon === 'tile' ? iconArt(brand, mark) : square(placed(mark, 1)),
  maskable: square(`${groundOf(brand, CANVAS, brand.tile)}${placed(mark, MASKABLE_SCALE)}`),
  foreground: square(placed(mark, FOREGROUND_SCALE)),
  background: square(groundOf(brand, CANVAS, brand.tile)),
  splash: square(`${groundOf(brand, SPLASH_SIZE, SPLASH_GROUND)}${placed(mark, SPLASH_SCALE, SPLASH_SIZE)}`, SPLASH_SIZE),
});

export { appArt, svgOf };
