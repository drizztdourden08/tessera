/* @layer renderer-components @kind data */
import type { ToolbarSide } from './ToolbarDock.type';

const MAX_PER_SIDE = 2;

const TOOLBAR_LAYOUT_V = 1;

const TOOLBAR_END = Number.MAX_SAFE_INTEGER;

const TOOLBAR_SIDES: readonly ToolbarSide[] = ['top', 'left', 'right', 'bottom'];

export { MAX_PER_SIDE, TOOLBAR_END, TOOLBAR_LAYOUT_V, TOOLBAR_SIDES };
