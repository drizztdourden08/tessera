/* @layer renderer-components @kind types */
interface TableColumn {
  path: string;
  label?: string;
  width?: number;
  grow?: boolean;
  fit?: boolean;
  displayField?: string;
}

interface SortEntry {
  path: string;
  dir: 'asc' | 'desc';
}

interface TableState {
  columns: readonly TableColumn[];
  sort: readonly SortEntry[];
  groupBy: readonly string[];
}

type ColumnMove = 'left' | 'right' | 'first' | 'last';

type GroupedRow<T> =
  | {
      kind: 'group';
      level: number;
      key: string;
      path: string;
      count: number;
      children: readonly GroupedRow<T>[];
    }
  | { kind: 'row'; row: T };

export type { ColumnMove, GroupedRow, SortEntry, TableColumn, TableState };
