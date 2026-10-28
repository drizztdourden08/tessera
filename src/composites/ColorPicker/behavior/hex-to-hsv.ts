/* @layer renderer-components @kind logic */
import { hexToRgb } from './color-math';
import type { Hsv } from './color-math.type';
import { rgbToHsv } from './rgb-to-hsv';

const hexToHsv = (hex: string): Hsv => rgbToHsv(hexToRgb(hex));

export { hexToHsv };
