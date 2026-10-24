/* @layer renderer-components @kind logic */
import type { PixelGrid } from '../Icon.type';
import { PIXEL_EMPTY, PIXEL_GRID_MARGIN, PIXEL_GRID_SIZE, PIXEL_INK } from './pixel-grid.constants';

const isRow = (row: string): boolean => row.length === PIXEL_GRID_SIZE && [...row].every((pixel) => pixel === PIXEL_INK || pixel === PIXEL_EMPTY);

const inMargin = (at: number): boolean => at < PIXEL_GRID_MARGIN || at >= PIXEL_GRID_SIZE - PIXEL_GRID_MARGIN;

const inksMargin = (row: string, y: number): boolean => isRow(row) && [...row].some((pixel, x) => pixel === PIXEL_INK && (inMargin(x) || inMargin(y)));

const pixelGridProblems = (grid: PixelGrid): string[] => {
  const rows = grid.length === PIXEL_GRID_SIZE ? [] : [`has ${grid.length} rows, wants ${PIXEL_GRID_SIZE}`];
  const bad = grid.flatMap((row, y) => (isRow(row) ? [] : [`row ${y} is not ${PIXEL_GRID_SIZE} characters of ${PIXEL_INK} and ${PIXEL_EMPTY}`]));
  const margin = grid.flatMap((row, y) => (inksMargin(row, y) ? [`row ${y} inks the ${PIXEL_GRID_MARGIN} px margin`] : []));
  const inked = grid.some((row) => row.includes(PIXEL_INK)) ? [] : ['has no inked pixel'];
  return [...rows, ...bad, ...margin, ...inked];
};

export { pixelGridProblems };
