/* @layer stories @kind logic */
import type { CellGeometry } from '../../../src/composites';

const CELL_WIDTH = 40;

const CELL_COUNT = 16;

const geometryOf = (widths: readonly number[]): CellGeometry => {
  const lefts: number[] = [];
  widths.reduce((left, width) => {
    lefts.push(left);
    return left + width;
  }, 0);
  return { lefts, widths };
};

const UNIFORM_CELLS = geometryOf(Array.from({ length: CELL_COUNT }, () => CELL_WIDTH));

const TIME_CELLS = geometryOf(Array.from({ length: CELL_COUNT }, (_, index) => CELL_WIDTH + (index % 4) * 16));

export { CELL_COUNT, TIME_CELLS, UNIFORM_CELLS };
