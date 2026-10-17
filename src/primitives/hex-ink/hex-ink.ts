/* @layer renderer-components @kind logic */
import { DARK_INK_FROM } from './hex-ink.constants';
import type { HexInk } from './hex-ink.type';
import { hexRgb } from './hex-rgb';
import { rgbLuminance } from './rgb-luminance';

const hexInk = (color: string): HexInk | null => {
  const rgb = hexRgb(color);
  if (rgb === null) return null;
  return rgbLuminance(rgb) > DARK_INK_FROM ? 'dark' : 'light';
};

export { hexInk };
