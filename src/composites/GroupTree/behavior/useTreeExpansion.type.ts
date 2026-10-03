/* @layer renderer-components @kind types */
import type { TreeNode } from '../GroupTree.type';

interface TreeExpansionInput<T> {
  root: TreeNode<T>;
  expandToDepth: number;
  expandedKeys?: readonly string[];
  onExpandedChange?: (keys: readonly string[]) => void;
}

interface TreeExpansion {
  open: ReadonlySet<string>;
  setExpanded: (key: string, expanded: boolean) => void;
  toggle: (key: string) => void;
}

export type { TreeExpansion, TreeExpansionInput };
