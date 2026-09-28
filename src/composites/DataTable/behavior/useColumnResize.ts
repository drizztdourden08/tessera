/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import { widthFromDrag } from './width-from-drag';
import type { PointerEvent } from 'react';
import type { ColumnResizeBinding } from '../DataTable.type';
import type { DragState, UseColumnResizeInput } from './useColumnResize.type';

const useColumnResize = (input: UseColumnResizeInput): ColumnResizeBinding => {
  const { path, cellRef, onPreview, onResize } = input;
  const [resizing, setResizing] = useState(false);
  const origin = useRef<DragState | null>(null);

  const onPointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const cell = cellRef.current;
    if (!cell) return;
    const startWidth = cell.getBoundingClientRect().width;
    origin.current = { startX: event.clientX, startWidth, width: startWidth };
    event.currentTarget.setPointerCapture(event.pointerId);
    setResizing(true);
  }, [cellRef]);

  const onPointerUp = useCallback((event: PointerEvent<HTMLElement>) => {
    const drag = origin.current;
    if (!drag) return;
    event.stopPropagation();
    origin.current = null;
    setResizing(false);
    const handle = event.currentTarget;
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    if (drag.width !== drag.startWidth) onResize(path, drag.width);
  }, [onResize, path]);

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const drag = origin.current;
    if (!drag) return;
    event.stopPropagation();
    if (event.buttons === 0) {
      onPointerUp(event);
      return;
    }
    drag.width = widthFromDrag({ ...drag, clientX: event.clientX });
    onPreview(path, drag.width);
  }, [onPointerUp, onPreview, path]);

  return { resizing, onPointerDown, onPointerMove, onPointerUp };
};

export { useColumnResize };
