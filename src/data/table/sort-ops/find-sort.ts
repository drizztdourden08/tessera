/* @layer renderer-components @kind logic */
import type { SortEntry } from '../types';

const findSort = (sort: readonly SortEntry[], path: string): SortEntry | undefined =>
  sort.find((entry) => entry.path === path);

export { findSort };
