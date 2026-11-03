/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { borderX, CELL_DRAG_THRESHOLD } from '../../cell-geometry';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import { spanDraft } from './span-draft';
import type { SpanDragMode, SpanDraft } from './span-drag.type';
import type { SpanDragSetup, SpanDragState } from './useSpanDrag.type';

const useSpanDrag = (setup: SpanDragSetup): SpanDragState => {
  const { cells, total, span, snap, minLength, readOnly, onChange, onDraft } = setup;
  const { live, begin } = useRectDrag<SpanDraft>();
  const moved = useRef(false);
  const dragged = useRef(false);

  const press = (mode: SpanDragMode) => (event: PointerEvent<HTMLElement>): void => {
    if (readOnly) return;
    moved.current = false;
    dragged.current = false;
    const origin = { startX: borderX(cells, span.start, total), endX: borderX(cells, span.end + 1, total) };
    begin(event, (delta) => {
      moved.current ||= Math.abs(delta.x) >= CELL_DRAG_THRESHOLD;
      const draft = spanDraft({ mode, span, dx: moved.current ? delta.x : 0, cells, total, snap, minLength, origin });
      if (moved.current) onDraft?.(draft.span);
      return draft;
    }, (last) => {
      onDraft?.(null);
      dragged.current = moved.current;
      if (last && moved.current && (last.span.start !== span.start || last.span.end !== span.end)) onChange?.(last.span);
    });
  };

  const consumeDrag = (): boolean => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };

  return { draft: live, press, consumeDrag };
};

export { useSpanDrag };
