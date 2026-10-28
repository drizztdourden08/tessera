/* @layer stories @kind data */
import type { ToolbarLayout } from '../../../src/composites';

const PARTIAL_SIDES: ToolbarLayout['sides'] = {
  top: [[{ id: 'shapes', start: 0, size: 0.6 }], [{ id: 'select', start: 0, size: 0.55 }]],
  left: [[{ id: 'tools', start: 0, size: 1 }]],
  right: [],
  bottom: [[{ id: 'view', start: 0, size: 0.7 }]],
};

const TOOLBAR_DOCK_RAIL_UNDER_TOP: ToolbarLayout = {
  v: 2,
  sides: PARTIAL_SIDES,
  corners: { 'top-left': ['h', 'v', 'h'], 'top-right': ['h', 'h'], 'bottom-left': ['v', 'h'], 'bottom-right': ['h'] },
  hidden: [],
  last: {},
};

const TOOLBAR_DOCK_RAIL_FULL_HEIGHT: ToolbarLayout = {
  ...TOOLBAR_DOCK_RAIL_UNDER_TOP,
  corners: { 'top-left': ['v', 'h', 'h'], 'top-right': ['h', 'h'], 'bottom-left': ['v', 'h'], 'bottom-right': ['h'] },
};

const TOOLBAR_DOCK_TWO_IN_LANE: ToolbarLayout = {
  ...TOOLBAR_DOCK_RAIL_UNDER_TOP,
  sides: {
    ...PARTIAL_SIDES,
    top: [[{ id: 'shapes', start: 0.02, size: 0.46 }, { id: 'select', start: 0.52, size: 0.4 }]],
  },
  corners: { 'top-left': ['h', 'v'], 'top-right': ['h'], 'bottom-left': ['v', 'h'], 'bottom-right': ['h'] },
};

const TOOLBAR_DOCK_FIELDS: ToolbarLayout = {
  ...TOOLBAR_DOCK_RAIL_UNDER_TOP,
  items: { tools: ['fill', 'picker'], shapes: ['curve'] },
  columns: { tools: 2 },
};

const TOOLBAR_DOCK_HINT = 'Drag a bar by its grip to drop it anywhere along a lane. Drag an end handle to push its neighbours. Drag the first or last end handle past the lane end to take a corner, and back to give it up.';

export { TOOLBAR_DOCK_FIELDS, TOOLBAR_DOCK_HINT, TOOLBAR_DOCK_RAIL_FULL_HEIGHT, TOOLBAR_DOCK_RAIL_UNDER_TOP, TOOLBAR_DOCK_TWO_IN_LANE };
