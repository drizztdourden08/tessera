/* @layer renderer-components @kind logic */
import { edgeBand } from '../../dock-zones/edge-band';
import { LANE_HIT, MAX_PER_SIDE, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarFrame, ToolbarZone } from './toolbar-drag.type';
import { toolbarSlotRect } from './toolbar-slot-rect';

const toolbarZones = (frame: ToolbarFrame, layout: ToolbarLayout, dragId: string): ToolbarZone[] => {
  const counts = Object.fromEntries(
    TOOLBAR_SIDES.map((side) => [side, layout.sides[side].filter((id) => id !== dragId).length]),
  ) as Record<ToolbarSide, number>;
  const depths = Object.fromEntries(
    TOOLBAR_SIDES.map((side) => [side, counts[side] * frame.thickness[side]]),
  ) as Record<ToolbarSide, number>;
  return TOOLBAR_SIDES.map((side) => {
    const others = counts[side];
    const free = others < MAX_PER_SIDE ? Array.from({ length: others + 1 }, (_, index) => index) : [];
    return {
      side,
      others,
      free,
      slots: free.map((index) => toolbarSlotRect(frame, depths, { side, lane: index, count: 1 })),
      band: edgeBand(frame.rect, side, LANE_HIT),
      held: toolbarSlotRect(frame, depths, { side, lane: 0, count: Math.max(others, 1) }),
    };
  });
};

export { toolbarZones };
