/* @layer renderer-components @kind util */
import type { SwatchColor, SwatchStrings } from '../SwatchGrid.type';

const swatchTitle = (color: SwatchColor, strings: SwatchStrings): string => color.label ?? color.value ?? strings.transparent;

export { swatchTitle };
