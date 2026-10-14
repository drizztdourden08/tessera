/* @layer renderer-components @kind logic */
import type { TagInk } from '../Tag.type';
import { DARK_INK_FROM, HEX_COLOR, LUMINANCE_WEIGHTS } from './tag-ink.constants';

const linear = (byte: number): number => {
  const c = byte / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const sixDigits = (digits: string): string => (digits.length === 3 ? [...digits].map((d) => d + d).join('') : digits);

const luminanceOf = (digits: string): number =>
  LUMINANCE_WEIGHTS.reduce((sum, weight, index) => sum + weight * linear(parseInt(digits.slice(index * 2, index * 2 + 2), 16)), 0);

const tagInk = (color: string): TagInk | null => {
  const digits = HEX_COLOR.exec(color)?.[1];
  if (digits === undefined) return null;
  return luminanceOf(sixDigits(digits)) > DARK_INK_FROM ? 'dark' : 'light';
};

export { tagInk };
