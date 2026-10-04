/* @layer renderer-components @kind logic */
import { insertAt } from '../../DockLayout';
import type { DockEdge, LayoutNode, PaneNode } from '../../DockLayout';

const lastPane = (node: LayoutNode): PaneNode | null => {
  if (node.kind === 'pane') return node;
  if (node.kind !== 'split') return null;
  for (let i = node.children.length - 1; i >= 0; i--) {
    const child = node.children[i];
    const found = child ? lastPane(child) : null;
    if (found) return found;
  }
  return null;
};

const evenOut = (node: LayoutNode, stack: LayoutNode): LayoutNode => {
  if (node.kind !== 'split') return node;
  if (node === stack) return { ...node, sizes: node.children.map(() => 1 / node.children.length) };
  return { ...node, children: node.children.map((child) => evenOut(child, stack)) };
};

const findStack = (node: LayoutNode, key: string): LayoutNode | null => {
  if (node.kind !== 'split') return null;
  if (node.children.some((child) => child.kind === 'pane' && child.key === key)) return node;
  for (const child of node.children) {
    const found = findStack(child, key);
    if (found) return found;
  }
  return null;
};

const joinEdge = (tree: LayoutNode, stack: LayoutNode, pane: PaneNode, edge: DockEdge): LayoutNode | null => {
  const last = lastPane(stack);
  if (!last) return null;
  const along: DockEdge = edge === 'left' || edge === 'right' ? 'bottom' : 'right';
  const joined = insertAt(tree, pane, { at: 'leaf', key: last.key, edge: along });
  const holder = findStack(joined, pane.key);
  return holder ? evenOut(joined, holder) : joined;
};

export { joinEdge };
