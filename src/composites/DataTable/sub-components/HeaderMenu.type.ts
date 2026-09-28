/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { SortEntry, TableColumn } from '../../../data/table/types';
import type { MenuOpenBinding } from '../../field-kits/behavior/use-menu-open.type';
import type { IdRefTargetFieldResolver } from '../behavior/display-substitution.type';
import type { PickerNode } from '../behavior/field-picker-nodes.type';
import type { ColumnActions } from '../DataTable.type';

interface HeaderMenuProps {
  menu: MenuOpenBinding<HTMLButtonElement>;
  label: string;
  column: TableColumn;
  field?: FieldDescriptor;
  index: number;
  columnCount: number;
  sortDir?: SortEntry['dir'];
  grouped: boolean;
  fieldNodes?: readonly PickerNode[];
  resolveTargetFields?: IdRefTargetFieldResolver;
  actions: ColumnActions;
  onStartRename: () => void;
}

export type { HeaderMenuProps };
