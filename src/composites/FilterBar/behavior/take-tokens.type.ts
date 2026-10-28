/* @layer renderer-components @kind types */
import type { FilterClause } from '../../../data/filter/clause';

type FilterTokenParser = (token: string) => FilterClause | null;

interface TokensTaken {
  rest: string;
  clauses: readonly FilterClause[];
}

export type { FilterTokenParser, TokensTaken };
