/* @layer renderer-components @kind logic */
import { clampWidth } from './clamp-width';
import type { DragWidthInput } from './column-width-math.type';

const widthFromDrag = ({ startWidth, startX, clientX }: DragWidthInput): number =>
  clampWidth(startWidth + (clientX - startX));

export { widthFromDrag };
