/* @layer renderer-components @kind logic */
import type { SortEntry } from '../types';
import { findSort } from './find-sort';

const setSortDir = (
  sort: readonly SortEntry[],
  path: string,
  dir: SortEntry['dir'],
): readonly SortEntry[] => {
  if (!findSort(sort, path)) return [...sort, { path, dir }];
  return sort.map((entry) => (entry.path === path ? { path, dir } : entry));
};

export { setSortDir };
