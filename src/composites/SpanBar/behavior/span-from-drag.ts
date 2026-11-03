/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { nearestBorder } from '../../cell-geometry';
import type { CellSpan } from '../../cell-geometry';
import type { SpanDragInput } from './span-drag.type';

const spanFromDrag = (input: SpanDragInput): CellSpan => {
  const { mode, span, dx, cells, total, minLength, origin } = input;
  const length = span.end - span.start + 1;
  if (mode === 'move') {
    const first = clampNumber(nearestBorder(cells, origin.startX + dx, total), 0, Math.max(0, total - length));
    return { start: first, end: first + length - 1 };
  }
  if (mode === 'start') {
    return { start: clampNumber(nearestBorder(cells, origin.startX + dx, total), 0, Math.max(0, span.end + 1 - minLength)), end: span.end };
  }
  const border = clampNumber(nearestBorder(cells, origin.endX + dx, total), Math.min(total, span.start + minLength), total);
  return { start: span.start, end: border - 1 };
};

export { spanFromDrag };
