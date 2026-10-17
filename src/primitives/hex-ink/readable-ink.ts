/* @layer renderer-components @kind logic */
import { DARK_GROUND, LIFT_STEP, READABLE_CONTRAST } from './hex-ink.constants';
import type { Rgb } from './hex-ink.type';
import { hexRgb } from './hex-rgb';
import { rgbLuminance } from './rgb-luminance';

const reads = (rgb: Rgb): boolean => (rgbLuminance(rgb) + 0.05) / (DARK_GROUND + 0.05) >= READABLE_CONTRAST;

const lift = (rgb: Rgb, share: number): Rgb => {
  const toward = (c: number): number => Math.round(c + (255 - c) * Math.min(share, 1));
  return [toward(rgb[0]), toward(rgb[1]), toward(rgb[2])];
};

const hexOf = (rgb: Rgb): string => `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`;

const readableInk = (color: string): string | null => {
  const rgb = hexRgb(color);
  if (rgb === null) return null;
  let share = 0;
  while (share < 1 && !reads(lift(rgb, share))) share += LIFT_STEP;
  return hexOf(lift(rgb, share));
};

export { readableInk };
