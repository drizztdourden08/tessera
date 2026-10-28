/* @layer renderer-components @kind types */
import type { TreeFlatRow } from '../Tree.type';
import type { TreeExpansion } from './useTreeExpansion.type';

interface TreeRowsInput<T> {
  items: readonly T[];
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
  isBranch?: (item: T) => boolean;
  filter?: (item: T) => boolean;
  loadingKeys?: ReadonlySet<string>;
  expandedKeys?: readonly string[];
  defaultExpandedKeys?: readonly string[];
  onExpandedChange?: (keys: readonly string[]) => void;
  onLoadChildren?: (item: T) => void;
}

interface TreeRows<T> {
  rows: readonly TreeFlatRow<T>[];
  keys: readonly string[];
  indexOfKey: ReadonlyMap<string, number>;
  expansion: TreeExpansion;
  filtering: boolean;
}

export type { TreeRows, TreeRowsInput };
