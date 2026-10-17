/* @layer renderer-components @kind logic */
import { HEX_COLOR } from './hex-ink.constants';
import type { Rgb } from './hex-ink.type';

const sixDigits = (digits: string): string => (digits.length === 3 ? [...digits].map((d) => d + d).join('') : digits);

const byteAt = (six: string, at: number): number => parseInt(six.slice(at, at + 2), 16);

const hexRgb = (color: string): Rgb | null => {
  const digits = HEX_COLOR.exec(color)?.[1];
  if (digits === undefined) return null;
  const six = sixDigits(digits);
  return [byteAt(six, 0), byteAt(six, 2), byteAt(six, 4)];
};

export { hexRgb };
