/* @layer renderer-components @kind logic */
import type { FilterClause } from '../../../data/filter/clause';

const removeClause = (
  clauses: readonly FilterClause[],
  id: string,
): readonly FilterClause[] => clauses.filter((clause) => clause.id !== id);

export { removeClause };
