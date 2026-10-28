/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { rangeBetween } from '../../selection/range-between';
import type { LogSelectionMove, LogStep } from './log-selection.type';

const stepSelection = (step: LogStep): LogSelectionMove | null => {
  const { order, mounted, cursor, anchor, by, extend } = step;
  const at = cursor === null ? -1 : mounted.indexOf(cursor);
  const next = mounted[at < 0 ? mounted.length - 1 : clampNumber(at + by, 0, mounted.length - 1)];
  if (next === undefined) return null;
  if (!extend) return { ids: new Set([next]), cursor: next, anchor: next };
  const from = anchor ?? cursor ?? next;
  return { ids: new Set(rangeBetween(order, from, next)), cursor: next, anchor: from };
};

export { stepSelection };
