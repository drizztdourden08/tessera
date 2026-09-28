/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../schema/field-descriptor';
import type { ColumnActions } from '../use-column-actions.type';
import type { GroupedRow, SortEntry, TableColumn, TableState } from '../types';

interface UseDataTableInput<T> {
  rows: readonly T[];
  schema: readonly FieldDescriptor[];
  initial?: readonly TableColumn[];
  initialGroupBy?: readonly string[];
}

interface DataTableState<T> extends TableState, ColumnActions {
  rows: readonly T[];
  sortedRows: readonly T[];
  groupedRows: readonly GroupedRow<T>[];
  setSingleSort: (path: string) => void;
  setSortDir: (path: string, dir: SortEntry['dir']) => void;
  removeSort: (path: string) => void;
  clearSort: () => void;
  addGroupBy: (path: string) => void;
  removeGroupBy: (path: string) => void;
  clearGroupBy: () => void;
  setState: (next: TableState) => void;
}

export type { DataTableState, UseDataTableInput };
