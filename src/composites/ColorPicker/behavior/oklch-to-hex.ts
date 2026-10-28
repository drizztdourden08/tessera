/* @layer renderer-components @kind logic */
import type { Oklch } from './color-math.type';
import { oklchToRgb } from './oklch-to-rgb';
import { rgbToHex } from './rgb-to-hex';

const oklchToHex = (lch: Oklch): string => rgbToHex(oklchToRgb(lch));

export { oklchToHex };
