/* @layer renderer-components @kind util */
import { CELL_SLACK, MAX_MASK_CELLS } from './mask.constants';
import type { MaskCells } from './mask.type';

const cellsFor = (ratio: number): MaskCells => {
  if (!Number.isFinite(ratio) || ratio <= 1 + CELL_SLACK) return 1;
  const cells = Math.min(MAX_MASK_CELLS, Math.ceil(ratio - CELL_SLACK));
  return cells === 2 ? 2 : 3;
};

export { cellsFor };
