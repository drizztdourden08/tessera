/* @layer renderer-components @kind types */
import type { SortGroupSummary } from './sort-group-summary.type';
import type { SchemaIndex } from '../../../data/schema/build-schema';
import type { SortEntry, TableColumn } from '../../../data/table/types';

interface ColumnLabelsInput {
  columns: readonly TableColumn[];
  schema: SchemaIndex;
  sort: readonly SortEntry[];
  groupBy: readonly string[];
  draggingPath: string | null;
}

interface ColumnLabels {
  labelOf: (path: string) => string;
  summary: SortGroupSummary;
  carriedLabel: string;
}

export type { ColumnLabels, ColumnLabelsInput };
