/* @layer renderer-components @kind data */
import type { ToolbarCorner, ToolbarSide } from '../ToolbarDock.type';

const GRID_LINES = 6;

const START_CORNER: Readonly<Record<ToolbarSide, ToolbarCorner>> = { top: 'top-left', bottom: 'bottom-left', left: 'top-left', right: 'top-right' };

const END_CORNER: Readonly<Record<ToolbarSide, ToolbarCorner>> = { top: 'top-right', bottom: 'bottom-right', left: 'bottom-left', right: 'bottom-right' };

export { END_CORNER, GRID_LINES, START_CORNER };
