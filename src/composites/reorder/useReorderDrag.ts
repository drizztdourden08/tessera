/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { PointerEvent } from 'react';
import { dropMarkOf } from './drop-mark-of';
import { finalIndex } from './final-index';
import { pointerInsertion } from './pointer-insertion';
import type { ReorderDrag, ReorderDragOptions, ReorderDragState } from './reorder.type';

const useReorderDrag = ({ listRef, selector, axis = 'vertical', locate, onDrop }: ReorderDragOptions): ReorderDrag => {
  const [drag, setDrag] = useState<ReorderDragState | null>(null);
  const handlers = (index: number) => ({
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDrag({ from: index, before: index });
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (drag) setDrag({ from: drag.from, before: locate ? locate(event) : pointerInsertion(listRef.current, selector, axis, event) });
    },
    onPointerUp: () => {
      if (!drag) return;
      setDrag(null);
      if (finalIndex(drag) !== drag.from) onDrop(drag.from, finalIndex(drag));
    },
    onPointerCancel: () => setDrag(null),
  });
  return { dragging: drag?.from ?? null, handlers, cancel: () => setDrag(null), dropMark: (index, total) => dropMarkOf(drag, index, total) };
};

export { useReorderDrag };
