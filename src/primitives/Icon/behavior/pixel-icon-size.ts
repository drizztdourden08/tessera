/* @layer renderer-components @kind logic */
import { PIXEL_GRID_SIZE } from './pixel-grid.constants';

const pixelIconSize = (size: number): number => Math.max(1, Math.round(size / PIXEL_GRID_SIZE)) * PIXEL_GRID_SIZE;

export { pixelIconSize };
