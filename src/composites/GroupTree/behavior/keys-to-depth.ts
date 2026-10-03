/* @layer renderer-components @kind logic */
import type { TreeNode } from '../GroupTree.type';

const keysToDepth = <T,>(node: TreeNode<T>, depth: number, level = 1): string[] => {
  if (level > depth) return [];
  return node.children.flatMap((child) => [child.key, ...keysToDepth(child, depth, level + 1)]);
};

export { keysToDepth };
