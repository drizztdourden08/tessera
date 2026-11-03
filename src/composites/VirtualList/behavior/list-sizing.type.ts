/* @layer renderer-components @kind types */
import type { VirtualAxis, VirtualSize } from '../../virtual';
import type { VirtualListItemSize, VirtualListRowSize } from '../VirtualList.type';

interface ListSizingInput {
  orientation: VirtualAxis;
  rowSize: VirtualListRowSize;
  rowHeight?: VirtualSize;
  itemSize?: VirtualListItemSize;
}

interface ListSizing {
  sizeOf?: (index: number) => number;
  itemToken?: VirtualSize;
  sizeKey: string;
}

export type { ListSizing, ListSizingInput };
