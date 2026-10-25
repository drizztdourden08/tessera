/* @layer renderer-components @kind logic */
import type { LayoutNode, Rect } from '../DockLayout.type';
import type { LaidOut } from './layout-tree.type';

const keysOf = (node: LayoutNode): string[] => (node.kind === 'split' ? node.children.flatMap(keysOf) : [node.key]);

const boundsOf = (laid: LaidOut, node: LayoutNode): Rect | null => {
  const keys = new Set(keysOf(node));
  const rects = laid.leaves.filter((leaf) => keys.has(leaf.node.key)).map((leaf) => leaf.rect);
  if (rects.length === 0) return null;
  const x = Math.min(...rects.map((r) => r.x));
  const y = Math.min(...rects.map((r) => r.y));
  return {
    x,
    y,
    width: Math.max(...rects.map((r) => r.x + r.width)) - x,
    height: Math.max(...rects.map((r) => r.y + r.height)) - y,
  };
};

export { boundsOf };
