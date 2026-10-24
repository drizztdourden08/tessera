/* @layer renderer-components @kind logic */
import { ANCHOR_GRID, ANCHORS } from '../AnchorPicker.constants';
import type { Anchor, AnchorCell } from '../AnchorPicker.type';

const anchorCell = (anchor: Anchor): AnchorCell => {
  const index = ANCHORS.indexOf(anchor);
  return { row: Math.floor(index / ANCHOR_GRID.length), col: index % ANCHOR_GRID.length };
};

export { anchorCell };
