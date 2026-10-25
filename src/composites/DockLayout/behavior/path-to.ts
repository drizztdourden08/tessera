/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';

const pathTo = (node: LayoutNode, key: string): LayoutNode[] | null => {
  if (node.kind !== 'split') return node.key === key ? [node] : null;
  for (const child of node.children) {
    const hit = pathTo(child, key);
    if (hit) return [node, ...hit];
  }
  return null;
};

export { pathTo };
