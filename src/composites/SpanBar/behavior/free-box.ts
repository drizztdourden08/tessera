/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { CellBox } from '../../cell-geometry';
import { SPAN_FREE_MIN } from '../SpanBar.constants';
import type { SpanDragMode, SpanOrigin } from './span-drag.type';

const freeBox = (mode: SpanDragMode, dx: number, origin: SpanOrigin, limit: number): CellBox => {
  const width = origin.endX - origin.startX;
  if (mode === 'move') return { left: clampNumber(origin.startX + dx, 0, Math.max(0, limit - width)), width };
  if (mode === 'start') {
    const left = clampNumber(origin.startX + dx, 0, origin.endX - SPAN_FREE_MIN);
    return { left, width: origin.endX - left };
  }
  const right = clampNumber(origin.endX + dx, origin.startX + SPAN_FREE_MIN, limit);
  return { left: origin.startX, width: right - origin.startX };
};

export { freeBox };
