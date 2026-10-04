/* @layer renderer-components @kind logic */
import type { DockEdge, Rect } from '../../DockLayout';

const nearestEdge = (pane: Rect, main: Rect): DockEdge => {
  const gaps: [DockEdge, number][] = [
    ['left', pane.x - main.x],
    ['right', main.x + main.width - (pane.x + pane.width)],
    ['top', pane.y - main.y],
    ['bottom', main.y + main.height - (pane.y + pane.height)],
  ];
  gaps.sort((a, b) => a[1] - b[1]);
  return gaps[0]?.[0] ?? 'left';
};

const edgeOf = (pane: Rect | null, main: Rect | null): DockEdge | undefined => {
  if (!pane || !main) return undefined;
  if (pane.x + pane.width <= main.x) return 'left';
  if (pane.x >= main.x + main.width) return 'right';
  if (pane.y + pane.height <= main.y) return 'top';
  if (pane.y >= main.y + main.height) return 'bottom';
  return nearestEdge(pane, main);
};

export { edgeOf };
