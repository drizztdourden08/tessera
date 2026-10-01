/* @layer renderer-components @kind types */
import type { SortEntry } from '../../../data/table/types';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface SortGroupInput {
  sort: readonly SortEntry[];
  groupBy: readonly string[];
  labelOf: (path: string) => string;
  strings: TesseraStrings['table'];
}

interface SortGroupSummary {
  sorted?: string;
  grouped?: string;
}

export type { SortGroupInput, SortGroupSummary };
