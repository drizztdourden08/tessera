/* @layer renderer-components @kind types */
import type { SortEntry } from '../../../data/table/types';
import type { ColumnActions } from '../DataTable.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface ColumnSortInput {
  path: string;
  sortDir?: SortEntry['dir'];
  actions: ColumnActions;
  act: (run: () => void) => () => void;
  strings: TesseraStrings['table'];
}

export type { ColumnSortInput };
