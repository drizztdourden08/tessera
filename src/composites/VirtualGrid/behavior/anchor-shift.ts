/* @layer renderer-components @kind logic */
import { firstRowFrom } from './first-row-from';
import { rowPlace } from './row-place';
import type { AnchorInput } from './anchor-shift.type';

const anchorShift = (input: AnchorInput): number => {
  const { rows, before, after, scrollTop } = input;
  const at = firstRowFrom(rows, before, Math.max(0, scrollTop), true);
  const row = rows[at];
  if (!row) return 0;
  return rowPlace(row, after, at).top - rowPlace(row, before, at).top;
};

export { anchorShift };
