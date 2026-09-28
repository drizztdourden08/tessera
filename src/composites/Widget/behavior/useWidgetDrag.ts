/* @layer renderer-components @kind hook */
import { useRef, useCallback } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { DragPosition } from './useWidgetDrag.type';

const useWidgetDrag = (
  pos: DragPosition,
  onMove: (x: number, y: number) => void,
) => {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      dragging.current = true;
      const view = ownerWindowOf(e.currentTarget);
      offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };

      const onMouseMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        onMove(ev.clientX - offset.current.x, ev.clientY - offset.current.y);
      };
      const onMouseUp = () => {
        dragging.current = false;
        view.removeEventListener('mousemove', onMouseMove);
        view.removeEventListener('mouseup', onMouseUp);
      };
      view.addEventListener('mousemove', onMouseMove);
      view.addEventListener('mouseup', onMouseUp);
    },
    [pos.x, pos.y, onMove],
  );

  return onMouseDown;
}

export { useWidgetDrag };
