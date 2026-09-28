/* @layer renderer-components @kind types */
interface FilterClause {
  id: string;
  path: string;
  op: string;
  value: unknown;
  enabled: boolean;
  caseSensitive?: boolean;
}

type RowPredicate = (row: unknown) => boolean;

export type { FilterClause, RowPredicate };
