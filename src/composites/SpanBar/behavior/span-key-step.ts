/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { CellSpan } from '../../cell-geometry';
import { SPAN_KEY_DIRECTION } from '../SpanBar.constants';
import type { SpanKeyInput } from './span-key-step.type';

const movedWhole = (span: CellSpan, direction: number, total: number): CellSpan => {
  const length = span.end - span.start + 1;
  const start = clampNumber(span.start + direction, 0, Math.max(0, total - length));
  return { start, end: start + length - 1 };
};

const movedEnd = (span: CellSpan, direction: number, total: number, minLength: number): CellSpan => ({
  start: span.start,
  end: clampNumber(span.end + direction, span.start + minLength - 1, total - 1),
});

const spanKeyStep = (key: SpanKeyInput, span: CellSpan, total: number, minLength: number): CellSpan | null => {
  const direction = SPAN_KEY_DIRECTION[key.key];
  if (direction === undefined || !key.alt || key.ctrl === key.shift) return null;
  const next = key.ctrl ? movedWhole(span, direction, total) : movedEnd(span, direction, total, minLength);
  return next.start === span.start && next.end === span.end ? null : next;
};

export { spanKeyStep };
