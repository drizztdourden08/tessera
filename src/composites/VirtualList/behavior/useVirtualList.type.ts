/* @layer renderer-components @kind types */
import type { MarqueeItem } from '../../marquee';
import type { SelectionModel } from '../../selection';
import type { ScrollAlign, VirtualFocusModel, VirtualItemsInput } from '../../virtual';
import type { VirtualListSelection } from '../VirtualList.type';

interface UseVirtualListInput<T> extends VirtualItemsInput<T> {
  selection?: VirtualListSelection;
  getLabel?: (item: T, index: number) => string;
}

interface VirtualListModel extends VirtualFocusModel {
  indices: readonly number[];
  selecting: boolean;
  select: SelectionModel;
  keys: readonly string[];
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
}

export type { UseVirtualListInput, VirtualListModel };
