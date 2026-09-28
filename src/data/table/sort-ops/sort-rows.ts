/* @layer renderer-components @kind logic */
import type { SortEntry } from '../types';
import type { ValueCompare } from './sort-ops.type';

const sortRows = <T>(
  rows: readonly T[],
  sort: readonly SortEntry[],
  compare: ValueCompare,
  valueAt: (path: string, row: T) => unknown,
): readonly T[] => {
  if (!sort.length) return rows;
  return [...rows]
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      for (const entry of sort) {
        const result = compare(entry.path, valueAt(entry.path, a.row), valueAt(entry.path, b.row));
        if (result !== 0) return entry.dir === 'asc' ? result : -result;
      }
      return a.index - b.index;
    })
    .map((entry) => entry.row);
};

export { sortRows };
