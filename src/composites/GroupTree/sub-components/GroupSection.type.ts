/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TreeNode } from '../GroupTree.type';

interface GroupSectionProps<T> {
  node: TreeNode<T>;
  depth: number;
  expandToDepth: number;
  renderItems: (items: T[]) => ReactNode;
  expandedKeys?: ReadonlySet<string>;
  onToggle?: (key: string) => void;
}

export type { GroupSectionProps };
