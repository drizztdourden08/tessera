/* @layer renderer-components @kind types */
import type { VirtualFocusModel, VirtualItemsInput } from '../../virtual';

type UseVirtualListInput<T> = VirtualItemsInput<T>;

interface VirtualListModel extends VirtualFocusModel {
  indices: readonly number[];
}

export type { UseVirtualListInput, VirtualListModel };
