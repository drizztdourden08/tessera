/* @layer renderer-components @kind logic */
import { GAP } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { LaidOut } from './layout-tree.type';
import { makesRoom } from './makes-room';

const besides = (a: Rect, b: Rect): boolean =>
  (Math.abs(a.x + a.width + GAP - b.x) < 1 || Math.abs(b.x + b.width + GAP - a.x) < 1) && a.y < b.y + b.height && b.y < a.y + a.height;

const stacked = (a: Rect, b: Rect): boolean =>
  (Math.abs(a.y + a.height + GAP - b.y) < 1 || Math.abs(b.y + b.height + GAP - a.y) < 1) && a.x < b.x + b.width && b.x < a.x + a.width;

const widen = (main: Rect, pane: Rect): Rect => {
  const x = Math.min(main.x, pane.x);
  return { ...main, x, width: Math.max(main.x + main.width, pane.x + pane.width) - x };
};

const deepen = (main: Rect, pane: Rect): Rect => {
  const y = Math.min(main.y, pane.y);
  return { ...main, y, height: Math.max(main.y + main.height, pane.y + pane.height) - y };
};

const mainRectOf = (laid: LaidOut): Rect | null => {
  const main = laid.leaves.find((leaf) => leaf.node.kind === 'main');
  if (!main) return null;
  let rect = main.rect;
  for (const leaf of laid.leaves) {
    if (leaf.node.kind !== 'pane' || makesRoom(leaf.node)) continue;
    if (besides(rect, leaf.rect)) rect = widen(rect, leaf.rect);
    else if (stacked(rect, leaf.rect)) rect = deepen(rect, leaf.rect);
  }
  return rect;
};

export { mainRectOf };
