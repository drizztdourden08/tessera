/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { PointerEvent } from 'react';
import { dropMarkOf } from './drop-mark-of';
import { finalIndex } from './final-index';
import { insertionAt } from './insertion-at';
import { AXIS_BOX } from './reorder.constants';
import type { ReorderDrag, ReorderDragOptions, ReorderDragState } from './reorder.type';

const useReorderDrag = ({ listRef, selector, axis = 'vertical', onDrop }: ReorderDragOptions): ReorderDrag => {
  const [drag, setDrag] = useState<ReorderDragState | null>(null);
  const handlers = (index: number) => ({
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDrag({ from: index, before: index });
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (drag) setDrag({ from: drag.from, before: insertionAt(listRef.current, selector, axis, event[AXIS_BOX[axis].pointer]) });
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
