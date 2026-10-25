/* @layer renderer-components @kind logic */
import { edgeBand } from '../../dock-zones/edge-band';
import { LANE_HIT, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarFrame, ToolbarZone } from './toolbar-drag.type';
import { toolbarLanesWithout } from './toolbar-lanes-without';
import { toolbarSideDepths } from './toolbar-side-depths';
import { toolbarSlotRect } from './toolbar-slot-rect';

const toolbarZones = (frame: ToolbarFrame, layout: ToolbarLayout, dragId: string): ToolbarZone[] => {
  const depths = toolbarSideDepths(frame, layout, dragId);
  return TOOLBAR_SIDES.map((side) => {
    const others = toolbarLanesWithout(layout, side, dragId).length;
    return {
      side,
      others,
      band: edgeBand(frame.rect, side, LANE_HIT),
      held: toolbarSlotRect(frame, depths, { side, lane: 0, count: Math.max(others, 1) }),
    };
  });
};

export { toolbarZones };
