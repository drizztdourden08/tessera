/* @layer renderer-components @kind logic */
import { GAP } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { LaidOut } from './layout-tree.type';

const touching = (a: Rect, b: Rect): boolean => {
  const besides = Math.abs(a.x + a.width + GAP - b.x) < 1 || Math.abs(b.x + b.width + GAP - a.x) < 1;
  const stacked = Math.abs(a.y + a.height + GAP - b.y) < 1 || Math.abs(b.y + b.height + GAP - a.y) < 1;
  const overlapY = a.y < b.y + b.height && b.y < a.y + a.height;
  const overlapX = a.x < b.x + b.width && b.x < a.x + a.width;
  return (besides && overlapY) || (stacked && overlapX);
};

const union = (a: Rect, b: Rect): Rect => {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return { x, y, width: Math.max(a.x + a.width, b.x + b.width) - x, height: Math.max(a.y + a.height, b.y + b.height) - y };
};

const mainRectOf = (laid: LaidOut): Rect | null => {
  const main = laid.leaves.find((leaf) => leaf.node.kind === 'main');
  if (!main) return null;
  let rect = main.rect;
  for (const leaf of laid.leaves) {
    if (leaf.node.kind !== 'pane' || leaf.node.makeRoom || !touching(rect, leaf.rect)) continue;
    rect = union(rect, leaf.rect);
  }
  return rect;
};

export { mainRectOf };
