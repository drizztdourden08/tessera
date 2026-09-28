/* @layer renderer-components @kind logic */
import type { SortEntry } from './types';

const effectiveSort = (sort: readonly SortEntry[], groupBy: readonly string[]): readonly SortEntry[] => {
  if (!groupBy.length) return sort;
  const leading: readonly SortEntry[] = groupBy.map((path) => ({ path, dir: 'asc' as const }));
  return [...leading, ...sort.filter((entry) => !groupBy.includes(entry.path))];
};

export { effectiveSort };
