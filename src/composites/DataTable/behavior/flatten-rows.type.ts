/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';

type GroupNode<T> = Extract<GroupedRow<T>, { kind: 'group' }>;

type FlatItem<T> =
  | { kind: 'group'; key: string; uid: string; node: GroupNode<T> }
  | { kind: 'row'; key: string; row: T };

interface FlattenInput<T> {
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
}

export type { FlatItem, FlattenInput, GroupNode };
