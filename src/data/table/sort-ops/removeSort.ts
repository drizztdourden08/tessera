/* @layer renderer-components @kind logic */
import type { SortEntry } from '../types';

const removeSort = (sort: readonly SortEntry[], path: string): readonly SortEntry[] =>
  sort.filter((entry) => entry.path !== path);

export { removeSort };
