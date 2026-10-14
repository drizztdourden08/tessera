/* @layer stories @kind data */
const sceneUri = (sky: string, ground: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90' width='320' height='180'>`
    + `<rect width='160' height='90' fill='${sky}'/>`
    + `<circle cx='124' cy='24' r='10' fill='#f4d35e'/>`
    + `<path d='M0 70 L40 44 L70 62 L104 36 L160 68 V90 H0Z' fill='${ground}'/>`
    + `<text x='8' y='84' font-family='monospace' font-size='8' fill='#ffffff'>${label}</text>`
    + `</svg>`,
  )}`;

const VALLEY_URI = sceneUri('#7fb3d5', '#3d7a4a', 'Valley, 14:02');
const DUSK_URI = sceneUri('#5b4a7a', '#2e3b4e', 'Ridge, 19:40');

const TOWER_URI = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80' width='60' height='80' preserveAspectRatio='none'>`
  + `<rect width='60' height='80' fill='#7fb3d5'/>`
  + `<circle cx='46' cy='14' r='7' fill='#f4d35e'/>`
  + `<rect x='20' y='22' width='20' height='50' fill='#6b6b7a'/>`
  + `<path d='M16 24 L30 8 L44 24Z' fill='#a8423a'/>`
  + `<rect x='0' y='70' width='60' height='10' fill='#3d7a4a'/>`
  + `</svg>`,
)}`;

const SPRITE_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVR42mNgoBXoipL7j4xJ1vjlchwKJsogZI3oLkAWJ0ozqfJwBficiVcNuh/xsYkygFAgE+U8bK4iKiCxhTwxYYRhKy42UWkB3QVE2Y4tzgkmIKrnBboDACM60C1YQ0QiAAAAAElFTkSuQmCC';

const IMAGE_FITS = ['cover', 'contain', 'fill', 'none'] as const;

const PIXEL_MODES = ['false', 'true', 'auto'] as const;

export { DUSK_URI, IMAGE_FITS, PIXEL_MODES, SPRITE_URI, TOWER_URI, VALLEY_URI };
