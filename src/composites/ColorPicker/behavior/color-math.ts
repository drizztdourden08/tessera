/* @layer renderer-components @kind logic */
import type { Rgb } from './color-math.type';

const hexToRgb = (hex: string): Rgb => {
  const n = parseInt(hex.replace('#', ''), 16) || 0;
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
};

export { hexToRgb };
