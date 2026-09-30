/* @layer renderer-components @kind logic */
import type { DockEdge, Rect } from '../../DockLayout';

const edgeOf = (pane: Rect | null, main: Rect | null): DockEdge | undefined => {
  if (!pane || !main) return undefined;
  if (pane.x + pane.width <= main.x) return 'left';
  if (pane.x >= main.x + main.width) return 'right';
  if (pane.y + pane.height <= main.y) return 'top';
  if (pane.y >= main.y + main.height) return 'bottom';
  return undefined;
};

export { edgeOf };
