/* @layer renderer-components @kind logic */
import { insertAt } from '../../DockLayout';
import type { DockEdge, LayoutNode, PaneNode } from '../../DockLayout';
import type { JoinOn } from './join-edge.type';

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

const sizeByWeight = (node: LayoutNode, stack: LayoutNode, weightFor: (child: LayoutNode) => number): LayoutNode => {
  if (node.kind !== 'split') return node;
  if (node === stack) {
    const weights = node.children.map(weightFor);
    const total = weights.reduce((sum, w) => sum + w, 0);
    return { ...node, sizes: weights.map((w) => w / total) };
  }
  return { ...node, children: node.children.map((child) => sizeByWeight(child, stack, weightFor)) };
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

const joinEdge = (tree: LayoutNode, stack: LayoutNode, pane: PaneNode, on: JoinOn): LayoutNode | null => {
  const last = lastPane(stack);
  if (!last) return null;
  const along: DockEdge = on.edge === 'left' || on.edge === 'right' ? 'bottom' : 'right';
  const joined = insertAt(tree, pane, { at: 'leaf', key: last.key, edge: along });
  const weightFor = (child: LayoutNode): number => {
    if (child.kind !== 'pane') return 1;
    return weightOf(child.key === pane.key ? on.weight : on.weightOf?.(child.active));
  };
  const holder = findStack(joined, pane.key);
  return holder ? sizeByWeight(joined, holder, weightFor) : joined;
};

export { joinEdge };
