/* @layer renderer-components @kind logic */
import type { LayoutNode, LeafNode } from '../DockLayout.type';

const findLeaf = (node: LayoutNode, key: string): LeafNode | null => {
  if (node.kind !== 'split') return node.key === key ? node : null;
  for (const child of node.children) {
    const hit = findLeaf(child, key);
    if (hit) return hit;
  }
  return null;
};

export { findLeaf };
