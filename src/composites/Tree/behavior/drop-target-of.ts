/* @layer renderer-components @kind logic */
import type { TreeDropTarget, TreeFlatRow } from '../Tree.type';
import { dropAllowed } from './drop-allowed';
import { zoneOf } from './drop-zone-of';
import { insideMoving } from './inside-moving';
import type { DropTargetInput } from './drop-target-of.type';

const gapBefore = <T,>(row: TreeFlatRow<T>, at: number): TreeDropTarget =>
  ({ gap: at, parentKey: row.parentKey, index: row.position - 1, into: false, intoAt: -1 });

const gapAfter = <T,>(rows: readonly TreeFlatRow<T>[], at: number): TreeDropTarget => {
  const row = rows[at];
  if (!row) return { gap: rows.length, parentKey: null, index: 0, into: false, intoAt: -1 };
  if (row.expanded && rows[at + 1]?.parentKey === row.key) return { gap: at + 1, parentKey: row.key, index: 0, into: false, intoAt: -1 };
  return { gap: at + 1, parentKey: row.parentKey, index: row.position, into: false, intoAt: -1 };
};

const rawTarget = <T,>(input: DropTargetInput<T>, intoOk: boolean): TreeDropTarget | undefined => {
  const { rows, y, rowHeight, from, moving } = input;
  const at = Math.min(rows.length - 1, Math.max(0, Math.floor(y / rowHeight)));
  const row = rows[at];
  if (!row) return undefined;
  if (y < 0) return gapBefore(row, at);
  const fraction = y >= rows.length * rowHeight ? 1 : (y - at * rowHeight) / rowHeight;
  const zone = zoneOf(fraction, intoOk && row.branch && !insideMoving(row, moving));
  if (zone === 'into') return { gap: at < from ? at : at + 1, parentKey: row.key, index: -1, into: true, intoAt: at };
  return zone === 'before' ? gapBefore(row, at) : gapAfter(rows, at);
};

const dropTargetOf = <T,>(input: DropTargetInput<T>): TreeDropTarget | undefined => {
  if (input.rows.length === 0 || input.rowHeight <= 0) return undefined;
  const target = rawTarget(input, true);
  if (target && dropAllowed(target, input)) return target;
  const gap = target?.into ? rawTarget(input, false) : undefined;
  return gap && dropAllowed(gap, input) ? gap : undefined;
};

export { dropTargetOf };
