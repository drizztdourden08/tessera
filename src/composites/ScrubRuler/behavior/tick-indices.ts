/* @layer renderer-components @kind logic */
import type { CellGeometry } from '../../cell-geometry';
import { SCRUB_TICK_GAP } from '../ScrubRuler.constants';

const isUniform = (cells: CellGeometry, total: number): boolean =>
  cells.widths.slice(0, total).every((width) => width === cells.widths[0]);

const spaced = (cells: CellGeometry, indices: readonly number[]): number[] => {
  let last = Number.NEGATIVE_INFINITY;
  return indices.filter((index) => {
    const left = cells.lefts[index] ?? 0;
    if (left - last < SCRUB_TICK_GAP) return false;
    last = left;
    return true;
  });
};

const tickIndices = (cells: CellGeometry, total: number, every: number | 'auto'): number[] => {
  const all = Array.from({ length: total }, (_, index) => index);
  if (typeof every === 'number') return all.filter((index) => index % Math.max(1, every) === 0);
  return isUniform(cells, total) ? spaced(cells, all) : all;
};

export { tickIndices };
