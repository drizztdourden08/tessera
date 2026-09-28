/* @layer renderer-components @kind logic */
import type { GroupedRow } from './types';
import type { GroupKeyFor } from './group-rows.type';

const asLeaves = <T>(rows: readonly T[]): GroupedRow<T>[] =>
  rows.map((row) => ({ kind: 'row', row }));

const bucketBy = <T>(rows: readonly T[], path: string, groupKeyFor: GroupKeyFor<T>): Map<string, T[]> => {
  const buckets = new Map<string, T[]>();
  for (const row of rows) {
    const key = groupKeyFor(path, row);
    const bucket = buckets.get(key);
    if (bucket) bucket.push(row);
    else buckets.set(key, [row]);
  }
  return buckets;
};

const build = <T>(
  rows: readonly T[],
  groupBy: readonly string[],
  groupKeyFor: GroupKeyFor<T>,
  level: number,
): GroupedRow<T>[] => {
  const path = groupBy[level];
  if (path === undefined) return asLeaves(rows);
  const buckets = bucketBy(rows, path, groupKeyFor);
  return [...buckets].map(([key, bucket]) => ({
    kind: 'group',
    level,
    key,
    path,
    count: bucket.length,
    children: build(bucket, groupBy, groupKeyFor, level + 1),
  }));
};

const groupRows = <T>(
  rows: readonly T[],
  groupBy: readonly string[],
  groupKeyFor: GroupKeyFor<T>,
): GroupedRow<T>[] => build(rows, groupBy, groupKeyFor, 0);

export { groupRows };
