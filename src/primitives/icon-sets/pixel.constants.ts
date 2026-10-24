/* @layer renderer-components @kind data */
import { PIXEL_TOOL_DRAW_GRIDS } from './pixel-tools-draw.constants';
import { PIXEL_TOOL_SELECT_GRIDS } from './pixel-tools-select.constants';
import { PIXEL_TOOL_SHAPES_GRIDS } from './pixel-tools-shapes.constants';
import { PIXEL_TOOL_VIEW_GRIDS } from './pixel-tools-view.constants';
import { pixelIconSet } from '../Icon/behavior/pixel-icon-set';

const PIXEL_GRIDS = { ...PIXEL_TOOL_DRAW_GRIDS, ...PIXEL_TOOL_SHAPES_GRIDS, ...PIXEL_TOOL_SELECT_GRIDS, ...PIXEL_TOOL_VIEW_GRIDS } as const;

const PIXEL_ICONS = pixelIconSet(PIXEL_GRIDS);

export { PIXEL_GRIDS, PIXEL_ICONS };
