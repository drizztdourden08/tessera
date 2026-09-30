/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../DockLayout.type';

const normalize = (sizes: number[]): number[] => {
  const total = sizes.reduce((a, b) => a + b, 0) || 1;
  return sizes.map((s) => s / total);
};

const rebuildSplit = (node: SplitNode, kept: (LayoutNode | null)[]): LayoutNode | null => {
  const children: LayoutNode[] = [];
  const sizes: number[] = [];
  kept.forEach((child, i) => {
    if (!child) return;
    children.push(child);
    sizes.push(node.sizes[i] ?? 0);
  });
  if (children.length === 0) return null;
  if (children.length === 1) return children[0] ?? null;
  return { ...node, children, sizes: normalize(sizes) };
};

export { rebuildSplit };
