/* @layer renderer-components @kind logic */
import { borderX, spanBox } from '../../cell-geometry';
import { freeBox } from './free-box';
import { spanFromDrag } from './span-from-drag';
import type { SpanDraft, SpanDragInput } from './span-drag.type';

const spanDraft = (input: SpanDragInput): SpanDraft => {
  const span = spanFromDrag(input);
  const box = input.snap === 'none'
    ? freeBox(input.mode, input.dx, input.origin, borderX(input.cells, input.total, input.total))
    : spanBox(input.cells, span, input.total);
  return { span, ...box };
};

export { spanDraft };
