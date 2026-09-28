/* @layer renderer-components @kind types */
import type { SchemaIndex } from '../schema/build-schema';
import type { GroupedRow, SortEntry } from './types';

interface DeriveRowsInput<T> {
  rows: readonly T[];
  schema: SchemaIndex;
  sort: readonly SortEntry[];
  groupBy: readonly string[];
}

interface DerivedRows<T> {
  sortedRows: readonly T[];
  groupedRows: readonly GroupedRow<T>[];
}

export type { DeriveRowsInput, DerivedRows };
