/* @layer renderer-components @kind logic */
import type { FilterClause } from '../../../data/filter/clause';

const addClause = (
  clauses: readonly FilterClause[],
  clause: FilterClause,
): readonly FilterClause[] => [...clauses, clause];

export { addClause };
