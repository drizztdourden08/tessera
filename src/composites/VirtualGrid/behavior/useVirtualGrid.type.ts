/* @layer renderer-components @kind types */
import type { VirtualFocusModel, VirtualItemsInput } from '../../virtual';

type UseVirtualGridInput<T> = VirtualItemsInput<T>;

interface VirtualGridModel extends VirtualFocusModel {
  rows: readonly number[];
  rowCount: number;
  columns: number;
}

export type { UseVirtualGridInput, VirtualGridModel };
