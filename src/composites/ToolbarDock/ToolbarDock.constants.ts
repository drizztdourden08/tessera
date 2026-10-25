/* @layer renderer-components @kind data */
import type { ToolbarCorner, ToolbarCornerClaim, ToolbarSide } from './ToolbarDock.type';

const MAX_LANES = 2;

const MAX_PER_SIDE = MAX_LANES;

const MIN_SHARE = 0.15;

const SHARE_EPSILON = 1e-9;

const TOOLBAR_LAYOUT_V = 2;

const TOOLBAR_DRAG_ATTRIBUTE = 'data-drag-toolbar';

const TOOLBAR_SIDES: readonly ToolbarSide[] = ['top', 'left', 'right', 'bottom'];

const TOOLBAR_CORNERS: readonly ToolbarCorner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const TOOLBAR_CORNER_SIDES: Readonly<Record<ToolbarCorner, { h: ToolbarSide; v: ToolbarSide }>> = {
  'top-left': { h: 'top', v: 'left' },
  'top-right': { h: 'top', v: 'right' },
  'bottom-left': { h: 'bottom', v: 'left' },
  'bottom-right': { h: 'bottom', v: 'right' },
};

const TOOLBAR_AXIS: Readonly<Record<ToolbarSide, ToolbarCornerClaim>> = { top: 'h', bottom: 'h', left: 'v', right: 'v' };

const TOOLBAR_OPPOSITE: Record<ToolbarSide, ToolbarSide> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

const TOOLBAR_ARROW_SIDES: Readonly<Record<string, ToolbarSide>> = { ArrowUp: 'top', ArrowDown: 'bottom', ArrowLeft: 'left', ArrowRight: 'right' };

const TOOLBAR_START_KEYS: readonly string[] = ['Enter', ' '];

const MIN_BAR_PX = 32;

const TOOLBAR_END_STEP = 8;

const TOOLBAR_END_LARGE_STEP = 64;

const LANE_HIT = 72;

const LANE_FALLBACK = 40;

const BASKET = { width: 192, height: 56, margin: 16 };

export {
  BASKET, LANE_FALLBACK, LANE_HIT, MAX_LANES, MAX_PER_SIDE, MIN_BAR_PX, MIN_SHARE, SHARE_EPSILON, TOOLBAR_ARROW_SIDES, TOOLBAR_AXIS, TOOLBAR_CORNER_SIDES, TOOLBAR_CORNERS,
  TOOLBAR_DRAG_ATTRIBUTE, TOOLBAR_END_LARGE_STEP, TOOLBAR_END_STEP, TOOLBAR_LAYOUT_V, TOOLBAR_OPPOSITE, TOOLBAR_SIDES, TOOLBAR_START_KEYS,
};
