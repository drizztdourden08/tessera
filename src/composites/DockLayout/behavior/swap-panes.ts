/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import { findLeaf } from './find-leaf';

const swapPanes = (tree: LayoutNode, keyA: string, keyB: string): LayoutNode => {
  const a = findLeaf(tree, keyA);
  const b = findLeaf(tree, keyB);
  if (a?.kind !== 'pane' || b?.kind !== 'pane') return tree;
  const swap = (node: LayoutNode): LayoutNode => {
    if (node.kind === 'split') return { ...node, children: node.children.map(swap) };
    if (node.key === keyA) return b;
    if (node.key === keyB) return a;
    return node;
  };
  return swap(tree);
};

export { swapPanes };
