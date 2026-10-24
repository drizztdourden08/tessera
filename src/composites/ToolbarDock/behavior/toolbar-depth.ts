/* @layer renderer-components @kind logic */
import type { Point, Rect } from '../../rect-drag/rect-drag.type';
import type { ToolbarSide } from '../ToolbarDock.type';

const toolbarDepth = (rect: Rect, side: ToolbarSide, p: Point): number => {
  switch (side) {
    case 'top': return p.y - rect.y;
    case 'bottom': return rect.y + rect.height - p.y;
    case 'left': return p.x - rect.x;
    case 'right': return rect.x + rect.width - p.x;
  }
};

export { toolbarDepth };
