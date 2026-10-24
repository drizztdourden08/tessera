/* @layer tooling-scripts @kind logic */
import { CANVAS, FOREGROUND_SCALE, ICON_MARK_SCALE, MASKABLE_SCALE, SPLASH_GROUND, SPLASH_SCALE, SPLASH_SIZE, SPLASH_WIDE_SCALE, TILE_RADIUS, TILE_SCALE, WIDE_RATIO } from './app-icons.constants.mjs';
import { crispAttr } from './art.mjs';

const placed = (art, scale, size = CANVAS) => {
  const edge = size * scale;
  const at = (size - edge) / 2;
  return `<svg x="${at}" y="${at}" width="${edge}" height="${edge}" viewBox="${art.viewBox}"${crispAttr(art)}>${art.body}</svg>`;
};

const square = (body, size = CANVAS) => ({ viewBox: `0 0 ${size} ${size}`, x: 0, y: 0, w: size, h: size, pixelArt: false, body });

const svgOf = (art) => `<svg xmlns="http://www.w3.org/2000/svg" width="${art.w}" height="${art.h}" viewBox="${art.viewBox}">${art.body}</svg>\n`;

const iconArt = (brand, mark, iconMark) => (brand.appIcon === 'tile'
  ? square(`<rect width="${CANVAS}" height="${CANVAS}" rx="${CANVAS * TILE_RADIUS}" fill="${brand.tile}"/>${placed(iconMark ?? mark, iconMark ? ICON_MARK_SCALE : TILE_SCALE)}`)
  : mark);

const groundOf = (brand, size, fill) => (brand.appIcon === 'tile' ? `<rect width="${size}" height="${size}" fill="${fill}"/>` : '');

const splashScale = (art) => (art.w / art.h >= WIDE_RATIO ? SPLASH_WIDE_SCALE : SPLASH_SCALE);

const appArt = (brand, mark, darkMark = mark, iconMark) => {
  const face = iconMark ?? mark;
  const shown = brand.appIcon === 'tile' ? darkMark : mark;
  return {
    icon: iconArt(brand, mark, iconMark),
    iconFile: brand.appIcon === 'tile' ? iconArt(brand, mark, iconMark) : square(placed(mark, 1)),
    maskable: square(`${groundOf(brand, CANVAS, brand.tile)}${placed(face, MASKABLE_SCALE)}`),
    foreground: square(placed(face, FOREGROUND_SCALE)),
    background: square(groundOf(brand, CANVAS, brand.tile)),
    splash: square(`${groundOf(brand, SPLASH_SIZE, SPLASH_GROUND)}${placed(shown, splashScale(shown), SPLASH_SIZE)}`, SPLASH_SIZE),
  };
};

export { appArt, svgOf };
