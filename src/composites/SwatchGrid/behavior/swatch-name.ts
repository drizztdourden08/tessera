/* @layer renderer-components @kind util */
import type { SwatchColor, SwatchStrings } from '../SwatchGrid.type';
import { swatchTitle } from './swatch-title';

const swatchName = (color: SwatchColor, index: number, secondary: boolean, strings: SwatchStrings): string => {
  const name = strings.name(swatchTitle(color, strings), index);
  return secondary ? `${name}, ${strings.secondary}` : name;
};

export { swatchName };
