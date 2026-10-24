/* @layer renderer-components @kind logic */
import type { PixelGrid } from '../Icon.type';
import { PIXEL_INK } from './pixel-grid.constants';

const rowRects = (row: string, y: number): string[] =>
  [...row.matchAll(new RegExp(`${PIXEL_INK}+`, 'g'))].map((run) => `M${run.index} ${y}h${run[0].length}v1h-${run[0].length}z`);

const pixelGridPath = (grid: PixelGrid): string => grid.flatMap(rowRects).join('');

export { pixelGridPath };
