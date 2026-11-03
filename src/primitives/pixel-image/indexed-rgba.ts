/* @layer renderer-components @kind util */
import { hexRgb } from '../hex-ink/hex-rgb';
import { OPAQUE, TRANSPARENT_PIXEL } from './pixel-image.constants';
import type { IndexedImage, RgbaImage } from './pixel-image.type';

const paletteRgba = (palette: readonly string[]): readonly (readonly number[])[] =>
  palette.map((color) => {
    const rgb = hexRgb(color);
    return rgb === null ? TRANSPARENT_PIXEL : [...rgb, OPAQUE];
  });

const indexedRgba = (indexed: IndexedImage): RgbaImage => {
  const { width, height, pixels, palette, transparent } = indexed;
  const colors = paletteRgba(palette);
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let at = 0; at < width * height; at += 1) {
    const index = pixels[at] ?? 0;
    const color = index === transparent ? TRANSPARENT_PIXEL : (colors[index] ?? TRANSPARENT_PIXEL);
    rgba.set(color, at * 4);
  }
  return { width, height, rgba };
};

export { indexedRgba };
