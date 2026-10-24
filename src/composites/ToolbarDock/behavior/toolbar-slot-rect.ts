/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';
import type { ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarFrame, ToolbarSlotSpan } from './toolbar-drag.type';

const toolbarSlotRect = (frame: ToolbarFrame, depths: Record<ToolbarSide, number>, span: ToolbarSlotSpan): Rect => {
  const { side, lane, count } = span;
  const { rect, thickness } = frame;
  const inset = lane * thickness[side];
  const reach = count * thickness[side];
  const between = rect.height - depths.top - depths.bottom;
  switch (side) {
    case 'top': return { x: rect.x, y: rect.y + inset, width: rect.width, height: reach };
    case 'bottom': return { x: rect.x, y: rect.y + rect.height - inset - reach, width: rect.width, height: reach };
    case 'left': return { x: rect.x + inset, y: rect.y + depths.top, width: reach, height: between };
    case 'right': return { x: rect.x + rect.width - inset - reach, y: rect.y + depths.top, width: reach, height: between };
  }
};

export { toolbarSlotRect };
