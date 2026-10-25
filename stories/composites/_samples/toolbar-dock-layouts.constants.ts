/* @layer stories @kind data */
import type { ToolbarLayout } from '../../../src/composites';

const PARTIAL_SIDES: ToolbarLayout['sides'] = {
  top: [[{ id: 'shapes', start: 0.02, size: 0.5 }], [{ id: 'select', start: 0.25, size: 0.45 }]],
  left: [[{ id: 'tools', start: 0.08, size: 0.7 }]],
  right: [],
  bottom: [[{ id: 'view', start: 0.3, size: 0.4 }]],
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

export { TOOLBAR_DOCK_RAIL_FULL_HEIGHT, TOOLBAR_DOCK_RAIL_UNDER_TOP };
