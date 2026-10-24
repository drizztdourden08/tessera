/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import type { PixelGrid } from '../Icon.type';
import { PIXEL_GRID_SIZE } from './pixel-grid.constants';
import { pixelGridPath } from './pixel-grid-path';

const pixelGridIcon = (grid: PixelGrid): IconifyIcon => ({
  body: `<path fill="currentColor" shape-rendering="crispEdges" d="${pixelGridPath(grid)}"/>`,
  width: PIXEL_GRID_SIZE,
  height: PIXEL_GRID_SIZE,
});

export { pixelGridIcon };
