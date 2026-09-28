/* @layer renderer-components @kind logic */
import type { Rgb } from './color-math.type';

const clampChannel = (n: number): number => Math.min(255, Math.max(0, Math.round(n)));

const rgbToHex = (rgb: Rgb): string => {
  const { r, g, b } = rgb;
  return `#${[r, g, b].map((c) => clampChannel(c).toString(16).padStart(2, '0')).join('')}`;
};

export { rgbToHex };
