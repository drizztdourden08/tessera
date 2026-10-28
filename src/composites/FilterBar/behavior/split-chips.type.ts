/* @layer renderer-components @kind types */
import type { FilterClause } from '../../../data/filter/clause';

interface ChipSplit {
  shown: readonly FilterClause[];
  folded: readonly FilterClause[];
}

export type { ChipSplit };
