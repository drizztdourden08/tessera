/* @layer renderer-components @kind logic */
import type { FilterClause } from '../../../data/filter/clause';

const updateClauseById = (
  clauses: readonly FilterClause[],
  id: string,
  patch: Partial<FilterClause>,
): readonly FilterClause[] =>
  clauses.map((clause) => (clause.id === id ? { ...clause, ...patch } : clause));

export { updateClauseById };
