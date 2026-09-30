/* @layer renderer-components @kind logic */
import { GAP, STRIP } from '../DockLayout.constants';
import type { LayoutNode, Rect, SplitAxis } from '../DockLayout.type';
import { holdsMain } from './holds-main';
import type { LaidOut } from './layout-tree.type';

const slice = (rect: Rect, axis: SplitAxis, at: number, len: number): Rect =>
  axis === 'row'
    ? { x: at, y: rect.y, width: len, height: rect.height }
    : { x: rect.x, y: at, width: rect.width, height: len };

const layoutNode = (node: LayoutNode, rect: Rect, out: LaidOut, peek: boolean): void => {
  if (node.kind !== 'split') {
    out.leaves.push({ node, rect });
    return;
  }
  const along = node.axis === 'row' ? rect.width : rect.height;
  const fixed = node.children.map((child) => (peek && !holdsMain(child) ? STRIP : null));
  const fixedSum = fixed.reduce<number>((sum, f) => sum + (f ?? 0), 0);
  const free = along - GAP * (node.children.length - 1) - fixedSum;
  const flex = node.sizes.reduce((sum, size, i) => sum + (fixed[i] === null ? size : 0), 0) || 1;
  let at = node.axis === 'row' ? rect.x : rect.y;
  node.children.forEach((child, i) => {
    const len = fixed[i] ?? (free * (node.sizes[i] ?? 0)) / flex;
    layoutNode(child, slice(rect, node.axis, at, len), out, peek);
    at += len;
    if (i < node.children.length - 1) {
      out.dividers.push({ node, index: i, rect: slice(rect, node.axis, at, GAP), along });
      at += GAP;
    }
  });
};

const layoutTree = (tree: LayoutNode, rect: Rect, peek = false): LaidOut => {
  const out: LaidOut = { leaves: [], dividers: [] };
  layoutNode(tree, rect, out, peek);
  return out;
};

export { layoutTree };
