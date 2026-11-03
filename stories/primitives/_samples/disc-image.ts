/* @layer stories @kind logic */
import type { RgbaImage } from '../../../src/primitives';

const discImage = (size: number): RgbaImage => {
  const rgba = new Uint8ClampedArray(size * size * 4);
  const middle = (size - 1) / 2;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const distance = Math.hypot(x - middle, y - middle);
      if (distance > middle) continue;
      const shade = Math.round((distance / middle) * 160);
      rgba.set([60 + shade, 140, 230 - shade, 255], (y * size + x) * 4);
    }
  }
  return { width: size, height: size, rgba };
};

export { discImage };
