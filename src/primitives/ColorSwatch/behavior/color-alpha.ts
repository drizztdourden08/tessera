/* @layer renderer-components @kind logic */
import { COMMA_ALPHA, HEX_ALPHA, OPAQUE, SLASH_ALPHA } from './color-alpha.constants';

const percentOrNumber = (text: string): number => (text.endsWith('%') ? Number.parseFloat(text) / 100 : Number.parseFloat(text));

const hexAlpha = (digits: string): number => {
  const byte = digits.length === 4 ? digits.slice(3).repeat(2) : digits.slice(6);
  return Number.parseInt(byte, 16) / 255;
};

const colorAlpha = (color: string): number => {
  const text = color.trim().toLowerCase();
  if (text === 'transparent') return 0;
  const hex = HEX_ALPHA.exec(text)?.[1];
  if (hex !== undefined) return hexAlpha(hex);
  const alpha = (SLASH_ALPHA.exec(text) ?? COMMA_ALPHA.exec(text))?.[1];
  if (alpha === undefined) return OPAQUE;
  const value = percentOrNumber(alpha);
  return Number.isNaN(value) ? OPAQUE : Math.min(OPAQUE, Math.max(0, value));
};

export { colorAlpha };
