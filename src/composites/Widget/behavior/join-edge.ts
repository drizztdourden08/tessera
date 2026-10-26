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

const weightOf = (weight: number | undefined): number => (weight !== undefined && weight > 0 && Number.isFinite(weight) ? weight : 1);

const sizeByWeight = (node: LayoutNode, stack: LayoutNode, key: string, weight: number | undefined): LayoutNode => {
  if (node.kind !== 'split') return node;
  if (node === stack) {
    const weights = node.children.map((child) => (child.kind === 'pane' && child.key === key ? weightOf(weight) : 1));
    const total = weights.reduce((sum, w) => sum + w, 0);
    return { ...node, sizes: weights.map((w) => w / total) };
  }
  return { ...node, children: node.children.map((child) => sizeByWeight(child, stack, key, weight)) };
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

const joinEdge = (tree: LayoutNode, stack: LayoutNode, pane: PaneNode, on: { edge: DockEdge; weight?: number }): LayoutNode | null => {
  const last = lastPane(stack);
  if (!last) return null;
  const along: DockEdge = on.edge === 'left' || on.edge === 'right' ? 'bottom' : 'right';
  const joined = insertAt(tree, pane, { at: 'leaf', key: last.key, edge: along });
  const holder = findStack(joined, pane.key);
  return holder ? sizeByWeight(joined, holder, pane.key, on.weight) : joined;
};

export { joinEdge };
