/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { SortEntry, TableColumn } from '../../../data/table/types';
import type { PickerNode } from '../behavior/field-picker-nodes.type';
import type { IdRefTargetFieldResolver } from '../behavior/display-substitution.type';
import type { ColumnActions, ColumnDragBinding } from '../DataTable.type';

interface HeaderCellProps {
  column: TableColumn;
  field?: FieldDescriptor;
  index: number;
  columnCount: number;
  sortDir?: SortEntry['dir'];
  grouped: boolean;
  fieldNodes?: readonly PickerNode[];
  resolveTargetFields?: IdRefTargetFieldResolver;
  actions: ColumnActions;
  drag: ColumnDragBinding;
  ghostRows: readonly unknown[];
  rowTotal: number;
}

export type { HeaderCellProps };
