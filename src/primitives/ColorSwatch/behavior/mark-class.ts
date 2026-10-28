/* @layer renderer-components @kind util */
import { swatchInk } from './swatch-ink';
import type { SwatchMark } from './swatch-marks.type';

const markClass = (mark: SwatchMark, color: string, transparent: boolean): string =>
  `color-swatch__mark color-swatch__mark--${mark.corner} color-swatch__mark--ink-${swatchInk(color, transparent)}`;

export { markClass };
