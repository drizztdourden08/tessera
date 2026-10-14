/* @layer stories @kind hook */
import { useRef } from 'react';
import type { PanHandlers } from '../MediaViewer.type';

const usePan = (enabled: boolean): PanHandlers => {
  const from = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  return {
    onPointerDown: (event) => {
      if (!enabled || event.button !== 0) return;
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
    onPointerUp: (event) => {
      from.current = null;
      delete event.currentTarget.dataset.panning;
    },
  };
};

export { usePan };
