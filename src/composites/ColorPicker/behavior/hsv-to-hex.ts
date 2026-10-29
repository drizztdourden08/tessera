/* @layer renderer-components @kind logic */
import type { Hsv } from './color-math.type';
import { hsvToRgb } from './hsv-to-rgb';
import { rgbToHex } from './rgb-to-hex';

const hsvToHex = (hsv: Hsv): string => rgbToHex(hsvToRgb(hsv));

export { hsvToHex };
