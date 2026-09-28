/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SchemaIndex } from '../../../data/schema/build-schema';
import type { SortEntry, TableColumn } from '../../../data/table/types';
import type { IdRefTargetFieldResolver } from '../behavior/display-substitution.type';
import type { PickerNode } from '../behavior/field-picker-nodes.type';
import type { ColumnActions, ColumnDragBinding } from '../DataTable.type';

interface HeaderRowProps {
  columns: readonly TableColumn[];
  schema: SchemaIndex;
  fieldNodes: readonly PickerNode[];
  sort: readonly SortEntry[];
  groupBy: readonly string[];
  resolveTargetFields?: IdRefTargetFieldResolver;
  actions: ColumnActions;
  drag: ColumnDragBinding;
  ghostRows: readonly unknown[];
  rowTotal: number;
  lead?: ReactNode;
}

export type { HeaderRowProps };
