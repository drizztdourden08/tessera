/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { PointerEvent, RefObject } from 'react';
import type { DragState, RowDrag } from '../RowGrid.type';

const insertionAt = (list: HTMLElement | null, y: number): number => {
  const rows = list ? [...list.querySelectorAll<HTMLElement>(':scope > [data-row-index]')] : [];
  const at = rows.findIndex((row) => {
    const box = row.getBoundingClientRect();
    return y < box.top + box.height / 2;
  });
  return at < 0 ? rows.length : at;
};

const finalIndex = (drag: DragState): number => (drag.before > drag.from ? drag.before - 1 : drag.before);

const useRowDrag = (listRef: RefObject<HTMLElement | null>, onDrop: (from: number, to: number) => void): RowDrag => {
  const [drag, setDrag] = useState<DragState | null>(null);
  const handlers = (index: number) => ({
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDrag({ from: index, before: index });
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (drag) setDrag({ from: drag.from, before: insertionAt(listRef.current, event.clientY) });
    },
    onPointerUp: () => {
      if (!drag) return;
      setDrag(null);
      if (finalIndex(drag) !== drag.from) onDrop(drag.from, finalIndex(drag));
    },
    onPointerCancel: () => setDrag(null),
  });
  const dropMark = (index: number, total: number) => {
    if (!drag || finalIndex(drag) === drag.from) return undefined;
    if (index === drag.before) return 'before' as const;
    return drag.before === total && index === total - 1 ? 'after' as const : undefined;
  };
  return { dragging: drag?.from ?? null, handlers, cancel: () => setDrag(null), dropMark };
};

export { useRowDrag };
