/* @layer renderer-components @kind types */
import type { SortEntry } from '../../../data/table/types';
import type { ColumnActions } from '../DataTable.type';

interface ColumnSortInput {
  path: string;
  sortDir?: SortEntry['dir'];
  actions: ColumnActions;
  act: (run: () => void) => () => void;
}

export type { ColumnSortInput };
