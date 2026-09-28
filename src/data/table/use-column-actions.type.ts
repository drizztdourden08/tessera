/* @layer renderer-components @kind types */
import type { ColumnMove, TableState } from './types';

interface ColumnActions {
  addColumn: (path: string) => void;
  insertColumn: (path: string, at: number) => void;
  removeColumn: (path: string) => void;
  moveColumn: (path: string, move: ColumnMove) => void;
  reorderColumn: (path: string, to: number) => void;
  renameColumn: (path: string, label: string) => void;
  resizeColumn: (path: string, width: number) => void;
  growColumn: (path: string) => void;
  fitColumn: (path: string) => void;
  fitAllColumns: () => void;
  setDisplayField: (path: string, displayField: string | undefined) => void;
  resetColumns: () => void;
}

type Columns = TableState['columns'];

export type { ColumnActions, Columns };
