/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { Rgb } from './color-math.type';

const clampChannel = (n: number): number => clampNumber(Math.round(n), 0, 255);

const rgbToHex = (rgb: Rgb): string => {
  const { r, g, b } = rgb;
  return `#${[r, g, b].map((c) => clampChannel(c).toString(16).padStart(2, '0')).join('')}`;
};

export { rgbToHex };
