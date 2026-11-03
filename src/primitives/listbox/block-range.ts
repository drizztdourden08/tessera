/* @layer renderer-components @kind util */
import { visibleRange } from '../../data/row-window';
import { EMPTY_RANGE, WINDOW_OVERSCAN } from './listbox.constants';
import type { RowRange } from '../../data/row-window';
import type { BlockRangeInput } from './listbox-window.type';

const blockRange = (input: BlockRangeInput): RowRange => {
  const { below, viewport, rowSize, count } = input;
  if (below > viewport + WINDOW_OVERSCAN * rowSize) return EMPTY_RANGE;
  return visibleRange({ scrollTop: -below, viewport, rowHeight: rowSize, count, overscan: WINDOW_OVERSCAN });
};

export { blockRange };
