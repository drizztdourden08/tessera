/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { SortEntry } from '../../../data/table/types';
import type { IdRefTargetFieldResolver } from './display-substitution.type';
import type { PickerNode } from './field-picker-nodes.type';
import type { ColumnActions } from '../DataTable.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface ColumnMenuInput {
  path: string;
  index: number;
  columnCount: number;
  grouped: boolean;
  sortDir?: SortEntry['dir'];
  grow?: boolean;
  fit?: boolean;
  field?: FieldDescriptor;
  displayField?: string;
  resolveTargetFields?: IdRefTargetFieldResolver;
  fieldNodes?: readonly PickerNode[];
  actions: ColumnActions;
  onStartRename: () => void;
  onClose: () => void;
  strings: TesseraStrings['table'];
}

export type { ColumnMenuInput };
