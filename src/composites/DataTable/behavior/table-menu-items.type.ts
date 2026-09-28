/* @layer renderer-components @kind types */
import type { PickerNode } from './field-picker-nodes.type';
import type { TableActions } from '../DataTable.type';

interface TableMenuInput {
  sortActive: boolean;
  groupActive: boolean;
  fieldNodes?: readonly PickerNode[];
  actions: TableActions;
  onClose: () => void;
}

export type { TableMenuInput };
