/* @layer renderer-components @kind data */
import { PIXEL_ACTION_FILE_GRIDS } from './pixel-actions-file.constants';
import { PIXEL_DOCUMENT_GRIDS } from './pixel-documents.constants';
import { PIXEL_FRAME_CEL_GRIDS } from './pixel-frame-cels.constants';
import { PIXEL_PAINT_BRUSH_GRIDS } from './pixel-paint-brushes.constants';
import { PIXEL_SHEET_VIEW_GRIDS } from './pixel-sheet-views.constants';
import { PIXEL_SPRITE_TRANSFORM_GRIDS } from './pixel-sprite-transform.constants';
import { PIXEL_TILEMAP_TILE_GRIDS } from './pixel-tilemap-tiles.constants';
import { PIXEL_TILEMAP_TOOL_GRIDS } from './pixel-tilemap-tools.constants';
import { PIXEL_TIMELINE_PLAYBACK_GRIDS } from './pixel-timeline-playback.constants';
import { PIXEL_TOOL_DRAW_GRIDS } from './pixel-tools-draw.constants';
import { PIXEL_TOOL_PAINT_GRIDS } from './pixel-tools-paint.constants';
import { PIXEL_TOOL_SELECT_GRIDS } from './pixel-tools-select.constants';
import { PIXEL_TOOL_SHAPES_GRIDS } from './pixel-tools-shapes.constants';
import { PIXEL_TOOL_VIEW_GRIDS } from './pixel-tools-view.constants';
import { PIXEL_VIEW_CANVAS_GRIDS } from './pixel-view-canvas.constants';
import { pixelIconSet } from '../Icon/behavior/pixel-icon-set';

const PIXEL_GRIDS = {
  ...PIXEL_TOOL_DRAW_GRIDS,
  ...PIXEL_TOOL_PAINT_GRIDS,
  ...PIXEL_TOOL_SHAPES_GRIDS,
  ...PIXEL_TOOL_SELECT_GRIDS,
  ...PIXEL_TOOL_VIEW_GRIDS,
  ...PIXEL_PAINT_BRUSH_GRIDS,
  ...PIXEL_VIEW_CANVAS_GRIDS,
  ...PIXEL_ACTION_FILE_GRIDS,
  ...PIXEL_SHEET_VIEW_GRIDS,
  ...PIXEL_TILEMAP_TILE_GRIDS,
  ...PIXEL_TILEMAP_TOOL_GRIDS,
  ...PIXEL_SPRITE_TRANSFORM_GRIDS,
  ...PIXEL_TIMELINE_PLAYBACK_GRIDS,
  ...PIXEL_FRAME_CEL_GRIDS,
  ...PIXEL_DOCUMENT_GRIDS,
} as const;

const PIXEL_ICONS = pixelIconSet(PIXEL_GRIDS);

export { PIXEL_GRIDS, PIXEL_ICONS };
