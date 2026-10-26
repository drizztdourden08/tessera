/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../../DockLayout';
import { mapSplit } from '../../DockLayout/behavior/map-split';

const parentOf = (node: LayoutNode, target: LayoutNode): SplitNode | null => {
  if (node.kind !== 'split') return null;
  if (node.children.includes(target)) return node;
  for (const child of node.children) {
    const found = parentOf(child, target);
    if (found) return found;
  }
  return null;
};

const resizeEdge = (tree: LayoutNode, stack: LayoutNode, share: number): LayoutNode => {
  const parent = parentOf(tree, stack);
  if (!parent) return tree;
  const at = parent.children.indexOf(stack);
  const rest = parent.sizes.reduce((total, size, i) => total + (i === at ? 0 : size), 0) || 1;
  const sizes = parent.sizes.map((size, i) => (i === at ? share : (size / rest) * (1 - share)));
  return mapSplit(tree, parent, (split) => ({ ...split, sizes }));
};

export { resizeEdge };
