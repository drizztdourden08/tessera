/* @layer renderer-components @kind logic */
import { INTO_BAND } from '../Tree.constants';
import type { TreeDropTarget, TreeFlatRow } from '../Tree.type';
import type { DropTargetInput } from './drop-target-of.type';

const gapBefore = <T,>(row: TreeFlatRow<T>, at: number): TreeDropTarget =>
  ({ gap: at, parentKey: row.parentKey, index: row.position - 1, into: false, intoAt: -1 });

const gapAfter = <T,>(rows: readonly TreeFlatRow<T>[], at: number): TreeDropTarget => {
  const row = rows[at];
  if (!row) return { gap: rows.length, parentKey: null, index: 0, into: false, intoAt: -1 };
  if (row.expanded && rows[at + 1]?.parentKey === row.key) return { gap: at + 1, parentKey: row.key, index: 0, into: false, intoAt: -1 };
  return { gap: at + 1, parentKey: row.parentKey, index: row.position, into: false, intoAt: -1 };
};

const rawTarget = <T,>(input: DropTargetInput<T>): TreeDropTarget | undefined => {
  const { rows, y, rowHeight, from, moving } = input;
  if (rows.length === 0 || rowHeight <= 0) return undefined;
  const at = Math.min(rows.length - 1, Math.max(0, Math.floor(y / rowHeight)));
  const row = rows[at];
  if (!row) return undefined;
  if (y < 0) return gapBefore(row, at);
  const fraction = y >= rows.length * rowHeight ? 1 : (y - at * rowHeight) / rowHeight;
  const inside = moving.has(row.key) || row.ancestors.some((ancestor) => moving.has(ancestor));
  const middle = row.branch && !inside;
  if (middle && fraction >= INTO_BAND && fraction <= 1 - INTO_BAND) {
    return { gap: at < from ? at : at + 1, parentKey: row.key, index: -1, into: true, intoAt: at };
  }
  return fraction < (middle ? INTO_BAND : 0.5) ? gapBefore(row, at) : gapAfter(rows, at);
};

const dropTargetOf = <T,>(input: DropTargetInput<T>): TreeDropTarget | undefined => {
  const { rows, indexOfKey, moving, maxDepth, allow } = input;
  const target = rawTarget(input);
  if (!target) return undefined;
  const parentAt = target.parentKey === null ? undefined : indexOfKey.get(target.parentKey);
  const parent = parentAt === undefined ? undefined : rows[parentAt];
  if (target.parentKey !== null && !parent) return undefined;
  if (parent && (moving.has(parent.key) || parent.ancestors.some((ancestor) => moving.has(ancestor)))) return undefined;
  if (maxDepth !== undefined && (parent?.depth ?? 0) + 1 > maxDepth) return undefined;
  return allow && !allow(target) ? undefined : target;
};

export { dropTargetOf };
