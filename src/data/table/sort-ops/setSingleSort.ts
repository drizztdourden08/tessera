/* @layer renderer-components @kind logic */
import type { SortEntry } from '../types';
import { findSort } from './findSort';

const setSingleSort = (sort: readonly SortEntry[], path: string): readonly SortEntry[] => {
  const current = sort.length === 1 ? findSort(sort, path) : undefined;
  if (!current) return [{ path, dir: 'asc' }];
  return current.dir === 'asc' ? [{ path, dir: 'desc' }] : [];
};

export { setSingleSort };
