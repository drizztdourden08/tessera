/* @layer renderer-components @kind logic */
import { ARROW_NAMES } from '../AnchorPicker.constants';
import type { Anchor, AnchorArrow } from '../AnchorPicker.type';
import { anchorCell } from './anchor-cell';

const arrowAway = (chosen: Anchor, cell: Anchor): AnchorArrow | null => {
  const from = anchorCell(chosen);
  const to = anchorCell(cell);
  return ARROW_NAMES[`${Math.sign(to.row - from.row)},${Math.sign(to.col - from.col)}`] ?? null;
};

export { arrowAway };
