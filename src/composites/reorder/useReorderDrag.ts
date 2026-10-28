/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { dropMarkOf } from './drop-mark-of';
import { finalIndex } from './final-index';
import { modifierOf } from './modifier-of';
import { pointerInsertion } from './pointer-insertion';
import { NO_KEYS } from './reorder.constants';
import { useDragScroll } from './useDragScroll';
import type { ReorderDrag, ReorderDragOptions, ReorderDragState, ReorderPoint } from './reorder.type';

const pointOf = (event: { clientX: number; clientY: number }): ReorderPoint => ({ x: event.clientX, y: event.clientY });

const useReorderDrag = ({ listRef, selector, axis = 'vertical', locate, keys, scrollRef, onDrop }: ReorderDragOptions): ReorderDrag => {
  const [drag, setDrag] = useState<ReorderDragState | null>(null);
  const pointer = useRef<ReorderPoint | null>(null);
  const insertionOf = (point: { clientX: number; clientY: number }) => (locate ? locate(point) : pointerInsertion(listRef.current, selector, axis, point));

  useDragScroll(drag !== null, scrollRef, pointer, () => {
    const at = pointer.current;
    if (!at) return;
    const before = insertionOf({ clientX: at.x, clientY: at.y });
    setDrag((now) => (now ? { ...now, before } : now));
  });

  const handlers = (index: number) => ({
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      pointer.current = pointOf(event);
      setDrag({ from: index, before: index, keys: keys?.(index) ?? NO_KEYS, point: pointOf(event), modifier: modifierOf(event) });
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (!drag) return;
      pointer.current = pointOf(event);
      setDrag({ ...drag, before: insertionOf(event), point: pointOf(event), modifier: modifierOf(event) });
    },
    onPointerUp: (event?: PointerEvent<HTMLElement>) => {
      if (!drag) return;
      setDrag(null);
      pointer.current = null;
      const to = finalIndex(drag);
      if (to !== drag.from || drag.keys.length > 1) onDrop(drag.from, to, { keys: drag.keys, before: drag.before, modifier: event ? modifierOf(event) : drag.modifier });
    },
    onPointerCancel: () => setDrag(null),
  });
  return {
    dragging: drag?.from ?? null,
    dragKeys: drag?.keys ?? NO_KEYS,
    point: drag?.point ?? null,
    handlers,
    cancel: () => setDrag(null),
    dropMark: (index, total) => dropMarkOf(drag, index, total),
  };
};

export { useReorderDrag };
