/* @layer renderer-components @kind types */
import type { PickerNode } from '../behavior/field-picker-nodes.type';
import type { TableActions } from '../DataTable.type';

interface TableOptionsMenuProps {
  sortActive: boolean;
  groupActive: boolean;
  fieldNodes?: readonly PickerNode[];
  actions: TableActions;
}

export type { TableOptionsMenuProps };
