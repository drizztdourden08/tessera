/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../DockLayout.type';

const mapSplit = (node: LayoutNode, target: SplitNode, fn: (split: SplitNode) => SplitNode): LayoutNode => {
  if (node.kind !== 'split') return node;
  if (node === target) return fn(node);
  return { ...node, children: node.children.map((child) => mapSplit(child, target, fn)) };
};

export { mapSplit };
