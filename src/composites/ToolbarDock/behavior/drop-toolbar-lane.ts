/* @layer renderer-components @kind logic */
import { TOOLBAR_AXIS, TOOLBAR_CORNER_SIDES, TOOLBAR_CORNERS } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { normalizeCorners } from './normalize-corners';
import { toolbarCornerWithout } from './toolbar-corner-without';
import { toolbarWithLanes } from './toolbar-with-lanes';

const dropToolbarLane = (layout: ToolbarLayout, side: ToolbarSide, lane: number): ToolbarLayout => {
  const next = toolbarWithLanes(layout, side, layout.sides[side].filter((_, index) => index !== lane));
  const only = new Set([lane]);
  const none = new Set<number>();
  const horizontal = TOOLBAR_AXIS[side] === 'h';
  const corners = { ...layout.corners };
  for (const corner of TOOLBAR_CORNERS) {
    const sides = TOOLBAR_CORNER_SIDES[corner];
    if (sides.h !== side && sides.v !== side) continue;
    corners[corner] = toolbarCornerWithout(layout.corners[corner], horizontal ? only : none, horizontal ? none : only);
  }
  return normalizeCorners({ ...next, corners });
};

export { dropToolbarLane };
