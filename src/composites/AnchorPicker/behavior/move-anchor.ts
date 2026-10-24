/* @layer renderer-components @kind logic */
import { ANCHOR_KEY_STEP, ANCHOR_LAST } from '../AnchorPicker.constants';
import type { Anchor } from '../AnchorPicker.type';
import { anchorCell } from './anchor-cell';
import { cellAnchor } from './cell-anchor';

const moveAnchor = (key: string, current: Anchor, whole = false): Anchor | null => {
  const { row, col } = anchorCell(current);
  if (key === 'Home') return cellAnchor({ row: whole ? 0 : row, col: 0 });
  if (key === 'End') return cellAnchor({ row: whole ? ANCHOR_LAST : row, col: ANCHOR_LAST });
  const step = ANCHOR_KEY_STEP[key];
  return step === undefined ? null : cellAnchor({ row: row + step[0], col: col + step[1] });
};

export { moveAnchor };
