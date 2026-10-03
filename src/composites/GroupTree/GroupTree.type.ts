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

interface TreeGroupRow<T> {
  kind: 'group';
  key: string;
  depth: number;
  parentKey: string | null;
  position: number;
  setSize: number;
  node: TreeNode<T>;
  count: number;
  expanded: boolean;
  ancestors: readonly string[];
}

interface TreeItemRow<T> {
  kind: 'item';
  key: string;
  depth: number;
  parentKey: string | null;
  position: number;
  setSize: number;
  item: T;
  itemKey: string;
  ancestors: readonly string[];
}

type TreeRow<T> = TreeGroupRow<T> | TreeItemRow<T>;

type TreeMove =
  | { kind: 'focus'; index: number }
  | { kind: 'expand'; key: string }
  | { kind: 'collapse'; key: string }
  | { kind: 'select'; index: number }
  | { kind: 'none' };

export type { GroupTreeProps, TreeGroupRow, TreeItemRow, TreeMove, TreeNode, TreeRow };
