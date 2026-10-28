/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface TreeNode<T> {
  key: string;
  label: string;
  icon?: ReactNode;
  meta?: ReactNode;
  count?: number;
  children: readonly TreeNode<T>[];
  items: readonly T[];
}

interface GroupTreeProps<T> {
  root: TreeNode<T>;
  getItemKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  itemIcon?: (item: T) => ReactNode;
  selectedKey?: string | null;
  onSelect?: (key: string, item: T | undefined) => void;
  onActivate?: (item: T) => void;
  expandToDepth?: number;
  expandedKeys?: readonly string[];
  onExpandedChange?: (keys: readonly string[]) => void;
  showCounts?: boolean;
  label?: string;
  emptyLabel?: string;
  className?: string;
}

interface GroupEntryBase {
  key: string;
  label: string;
}

interface GroupGroupEntry<T> extends GroupEntryBase {
  kind: 'group';
  node: TreeNode<T>;
  count: number;
  children: readonly GroupEntry<T>[];
}

interface GroupItemEntry<T> extends GroupEntryBase {
  kind: 'item';
  item: T;
  itemKey: string;
  children: undefined;
}

type GroupEntry<T> = GroupGroupEntry<T> | GroupItemEntry<T>;

interface GroupEntries<T> {
  top: readonly GroupEntry<T>[];
  byKey: ReadonlyMap<string, GroupEntry<T>>;
  bySelection: ReadonlyMap<string, readonly string[]>;
}

interface GroupCollector<T> {
  byKey: Map<string, GroupEntry<T>>;
  bySelection: Map<string, string[]>;
}

export type { GroupCollector, GroupEntries, GroupEntry, GroupTreeProps, TreeNode };
