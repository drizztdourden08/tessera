/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { PanHandlers, PanStart } from '../MediaViewer.type';

const usePan = (enabled: boolean): PanHandlers => {
  const from = useRef<PanStart | null>(null);
  const end = (event: PointerEvent<HTMLElement>) => {
    from.current = null;
    delete event.currentTarget.dataset.panning;
  };
  return {
    onPointerDown: (event) => {
      if (!enabled || event.button !== 0 || event.pointerType === 'touch') return;
      const stage = event.currentTarget;
      from.current = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
      stage.setPointerCapture(event.pointerId);
      stage.dataset.panning = '';
    },
    onPointerMove: (event) => {
      const start = from.current;
      if (!start) return;
      event.currentTarget.scrollLeft = start.left - (event.clientX - start.x);
      event.currentTarget.scrollTop = start.top - (event.clientY - start.y);
    },
    onPointerUp: end,
    onPointerCancel: end,
  };
};

export { usePan };
