/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';
import type { FlatItem } from './flatten-rows.type';

interface UseRowOrderInput<T> {
  enabled: boolean;
  items: readonly FlatItem<T>[] | null;
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
}

interface RowOrder {
  keys: readonly string[];
  groups: readonly (string | undefined)[];
  indexOf: (id: string) => number;
}

export type { RowOrder, UseRowOrderInput };
