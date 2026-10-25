/* @layer renderer-components @kind logic */
import { TOOLBAR_AXIS, TOOLBAR_CORNER_SIDES, TOOLBAR_CORNERS } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';
import { normalizeCorners } from './normalize-corners';
import { toolbarCornerWith } from './toolbar-corner-with';
import { toolbarWithLanes } from './toolbar-with-lanes';

const insertToolbarLane = (layout: ToolbarLayout, side: ToolbarSide, lane: number, places: ToolbarPlace[]): ToolbarLayout => {
  const lanes = layout.sides[side];
  const next = toolbarWithLanes(layout, side, [...lanes.slice(0, lane), places, ...lanes.slice(lane)]);
  const corners = { ...layout.corners };
  for (const corner of TOOLBAR_CORNERS) {
    const sides = TOOLBAR_CORNER_SIDES[corner];
    if (sides.h === side || sides.v === side) corners[corner] = toolbarCornerWith(layout.corners[corner], TOOLBAR_AXIS[side], lane);
  }
  return normalizeCorners({ ...next, corners });
};

export { insertToolbarLane };
