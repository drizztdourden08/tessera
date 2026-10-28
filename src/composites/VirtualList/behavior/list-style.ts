/* @layer renderer-components @kind logic */
import { sizeVariable } from '../../virtual/size-variable';
import { ITEM_PROPERTY, ROW_PROPERTY } from '../VirtualList.constants';
import type { CSSProperties } from 'react';
import type { VirtualAxis, VirtualSize } from '../../virtual';

const listStyle = (axis: VirtualAxis, rowHeight?: VirtualSize, itemSize?: VirtualSize): CSSProperties | undefined => {
  const size = axis === 'horizontal' ? itemSize : rowHeight;
  if (!size) return undefined;
  return { [axis === 'horizontal' ? ITEM_PROPERTY : ROW_PROPERTY]: sizeVariable(size) };
};

export { listStyle };
