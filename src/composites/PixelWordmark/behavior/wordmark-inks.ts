/* @layer renderer-components @kind logic */
import type { PixelWordmarkColors } from '../PixelWordmark.type';
import { OUTLINE_SHADE, SHADOW_SHADE } from './wordmark-inks.constants';
import type { WordmarkInks } from './wordmark-inks.type';

const channels = (hex: string): number[] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const shade = (hex: string, k: number): string =>
  `#${channels(hex).map((v) => Math.round(v * k).toString(16).padStart(2, '0')).join('')}`;

const wordmarkInks = (colors: PixelWordmarkColors): WordmarkInks => {
  const deepest = colors[3];
  return {
    fill: colors,
    outline: OUTLINE_SHADE.map((k) => shade(deepest, k)),
    shadow: shade(deepest, SHADOW_SHADE),
  };
};

export { wordmarkInks };
