/* @layer renderer-components @kind logic */
import type { SchemaIndex } from '../schema/build-schema';
import { getPath } from '../schema/path';
import { groupRows } from './group-rows';
import { sortRows } from './sort-ops';
import { getComparator, getGroupKey } from './strategy-registry';
import { effectiveSort } from './effectiveSort';
import type { DeriveRowsInput, DerivedRows } from './derive-rows.type';

const kindAt = (schema: SchemaIndex, path: string) => schema.byPath(path)?.kind ?? 'unknown';

const deriveRows = <T>({ rows, schema, sort, groupBy }: DeriveRowsInput<T>): DerivedRows<T> => {
  const compare = (path: string, a: unknown, b: unknown): number =>
    getComparator(kindAt(schema, path))(a, b);
  const valueAt = (path: string, row: T): unknown => getPath(row, path);
  const groupKeyFor = (path: string, row: T): string =>
    getGroupKey(kindAt(schema, path))(getPath(row, path));

  const sortedRows = sortRows(rows, effectiveSort(sort, groupBy), compare, valueAt);
  return { sortedRows, groupedRows: groupRows(sortedRows, groupBy, groupKeyFor) };
};

export { deriveRows };
