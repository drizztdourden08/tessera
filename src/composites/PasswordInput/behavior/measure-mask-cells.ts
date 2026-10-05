/* @layer renderer-components @kind util */
import { cellsFor } from './cells-for';
import type { MaskCells } from './mask.type';

const measureMaskCells = (input: HTMLInputElement, maskChar: string): MaskCells => {
  const context = input.ownerDocument.createElement('canvas').getContext('2d');
  const style = input.ownerDocument.defaultView?.getComputedStyle(input);
  if (context === null || style === undefined) return 1;
  context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return cellsFor(context.measureText(maskChar).width / context.measureText('0').width);
};

export { measureMaskCells };
