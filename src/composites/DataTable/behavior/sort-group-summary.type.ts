/* @layer renderer-components @kind types */
import type { SortEntry } from '../../../data/table/types';

interface SortGroupInput {
  sort: readonly SortEntry[];
  groupBy: readonly string[];
  labelOf: (path: string) => string;
}

interface SortGroupSummary {
  sorted?: string;
  grouped?: string;
}

export type { SortGroupInput, SortGroupSummary };
