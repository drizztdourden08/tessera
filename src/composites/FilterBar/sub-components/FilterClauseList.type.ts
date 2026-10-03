/* @layer renderer-components @kind types */
import type { SchemaLike } from '../../../data/schema/build-schema';
import type { FilterClause } from '../../../data/filter/clause';

interface FilterClauseListProps {
  schema: SchemaLike;
  clauses: readonly FilterClause[];
  fields?: readonly string[];
  onChange: (next: readonly FilterClause[]) => void;
}

export type { FilterClauseListProps };
