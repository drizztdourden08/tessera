/* @layer renderer-components @kind util */
import { swatchInk } from './swatch-ink';

const captionClass = (color: string, transparent: boolean): string =>
  `color-swatch__caption color-swatch__caption--ink-${swatchInk(color, transparent)}`;

export { captionClass };
