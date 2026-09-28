/* @layer renderer-components @kind types */
import type { SchemaLike } from '../../../data/schema/build-schema';
import type { FilterClause } from '../../../data/filter/clause';

interface FilterClauseListProps {
  schema: SchemaLike;
  clauses: readonly FilterClause[];
  onChange: (next: readonly FilterClause[]) => void;
}

export type { FilterClauseListProps };
