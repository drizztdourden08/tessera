/* @layer renderer-components @kind logic */
import type { TreeNode } from '../GroupTree.type';

const countItems = <T,>(node: TreeNode<T>): number =>
  node.children.reduce((sum, child) => sum + countItems(child), node.items.length);

export { countItems };
