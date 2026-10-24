/* @layer renderer-components @kind data */
import type { ToolbarSide } from './ToolbarDock.type';

const MAX_PER_SIDE = 2;

const TOOLBAR_LAYOUT_V = 1;

const TOOLBAR_END = Number.MAX_SAFE_INTEGER;

const TOOLBAR_DRAG_ATTRIBUTE = 'data-drag-toolbar';

const TOOLBAR_SIDES: readonly ToolbarSide[] = ['top', 'left', 'right', 'bottom'];

const TOOLBAR_OPPOSITE: Record<ToolbarSide, ToolbarSide> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

const TOOLBAR_ARROW_SIDES: Readonly<Record<string, ToolbarSide>> = { ArrowUp: 'top', ArrowDown: 'bottom', ArrowLeft: 'left', ArrowRight: 'right' };

const TOOLBAR_START_KEYS: readonly string[] = ['Enter', ' '];

const LANE_HIT = 72;

const LANE_FALLBACK = 40;

const BASKET = { width: 192, height: 56, margin: 16 };

export { BASKET, LANE_FALLBACK, LANE_HIT, MAX_PER_SIDE, TOOLBAR_ARROW_SIDES, TOOLBAR_DRAG_ATTRIBUTE, TOOLBAR_END, TOOLBAR_LAYOUT_V, TOOLBAR_OPPOSITE, TOOLBAR_SIDES, TOOLBAR_START_KEYS };
