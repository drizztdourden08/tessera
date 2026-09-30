/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import { rebuildSplit } from './rebuild-split';

const removeLeaf = (node: LayoutNode, key: string): LayoutNode | null => {
  if (node.kind !== 'split') return node.key === key ? null : node;
  return rebuildSplit(node, node.children.map((child) => removeLeaf(child, key)));
};

export { removeLeaf };
