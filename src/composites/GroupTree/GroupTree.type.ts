/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface TreeNode<T> {
  key: string;
  label: string;
  meta?: ReactNode;
  children: TreeNode<T>[];
  items: T[];
}

interface GroupTreeProps<T> {
  root: TreeNode<T>;
  renderItems: (items: T[]) => ReactNode;
  expandToDepth?: number;
  expandedKeys?: readonly string[];
  onToggleKey?: (key: string) => void;
  className?: string;
  emptyLabel?: string;
}

export type { GroupTreeProps, TreeNode };
