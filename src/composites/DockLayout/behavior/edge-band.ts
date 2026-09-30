/* @layer renderer-components @kind logic */
import type { DockEdge, Rect } from '../DockLayout.type';

const edgeBand = (rect: Rect, edge: DockEdge, size: number): Rect => {
  switch (edge) {
    case 'left': return { ...rect, width: size };
    case 'right': return { ...rect, x: rect.x + rect.width - size, width: size };
    case 'top': return { ...rect, height: size };
    case 'bottom': return { ...rect, y: rect.y + rect.height - size, height: size };
  }
};

export { edgeBand };
