/* @layer renderer-components @kind logic */
import type { PixelGrid } from '../Icon.type';
import { PIXEL_EMPTY, PIXEL_GRID_SIZE, PIXEL_INK } from './pixel-grid.constants';

const isRow = (row: string): boolean => row.length === PIXEL_GRID_SIZE && [...row].every((pixel) => pixel === PIXEL_INK || pixel === PIXEL_EMPTY);

const pixelGridProblems = (grid: PixelGrid): string[] => {
  const rows = grid.length === PIXEL_GRID_SIZE ? [] : [`has ${grid.length} rows, wants ${PIXEL_GRID_SIZE}`];
  const bad = grid.flatMap((row, y) => (isRow(row) ? [] : [`row ${y} is not ${PIXEL_GRID_SIZE} characters of ${PIXEL_INK} and ${PIXEL_EMPTY}`]));
  const inked = grid.some((row) => row.includes(PIXEL_INK)) ? [] : ['has no inked pixel'];
  return [...rows, ...bad, ...inked];
};

export { pixelGridProblems };
