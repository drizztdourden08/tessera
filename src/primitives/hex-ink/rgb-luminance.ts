/* @layer renderer-components @kind logic */
import { LUMINANCE_WEIGHTS } from './hex-ink.constants';
import type { Rgb } from './hex-ink.type';

const linear = (byte: number): number => {
  const c = byte / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const rgbLuminance = (rgb: Rgb): number =>
  LUMINANCE_WEIGHTS.reduce((sum, weight, index) => sum + weight * linear(rgb[index] ?? 0), 0);

export { rgbLuminance };
