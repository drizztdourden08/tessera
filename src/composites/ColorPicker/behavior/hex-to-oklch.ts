/* @layer renderer-components @kind logic */
import { hexToRgb } from './color-math';
import type { Oklch } from './color-math.type';
import { rgbToOklch } from './rgb-to-oklch';

const hexToOklch = (hex: string): Oklch => rgbToOklch(hexToRgb(hex));

export { hexToOklch };
