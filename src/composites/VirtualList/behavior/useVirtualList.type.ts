/* @layer renderer-components @kind types */
import type { MarqueeItem } from '../../marquee';
import type { SelectionModel } from '../../selection';
import type { ScrollAlign, VirtualFocusModel, VirtualItemsInput, VirtualScrollParent } from '../../virtual';
import type { VirtualListReorder, VirtualListSelection } from '../VirtualList.type';
import type { ItemLayout } from './item-layout.type';
import type { ListReorder } from './useListReorder.type';

interface UseVirtualListInput<T> extends VirtualItemsInput<T> {
  selection?: VirtualListSelection;
  getLabel?: (item: T, index: number) => string;
  sizeOf?: (index: number) => number;
  sizeOfKey?: string;
  reorder?: VirtualListReorder<T>;
  scrollParent?: VirtualScrollParent;
  initialFocusIndex?: number;
}

interface VirtualListModel extends VirtualFocusModel {
  indices: readonly number[];
  selecting: boolean;
  select: SelectionModel;
  keys: readonly string[];
  layout: ItemLayout;
  variable: boolean;
  moving: ListReorder;
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
}

export type { UseVirtualListInput, VirtualListModel };
