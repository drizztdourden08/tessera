/* @layer renderer-components @kind logic */
import type { FilterClause } from '../../../data/filter/clause';
import type { ChipSplit } from './split-chips.type';

const splitChips = (clauses: readonly FilterClause[], max: number | undefined): ChipSplit => {
  if (max === undefined || max < 0 || clauses.length <= max) return { shown: clauses, folded: [] };
  return { shown: clauses.slice(0, max), folded: clauses.slice(max) };
};

export { splitChips };
