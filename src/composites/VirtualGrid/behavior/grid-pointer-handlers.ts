/* @layer renderer-components @kind logic */
import { DRAG_THRESHOLD } from '../VirtualGrid.constants';
import type { PointerEvent } from 'react';
import type { GridPointerHandlers } from './useGridDrag.type';
import type { GridPointerInput } from './grid-pointer-handlers.type';

const gridPointerHandlers = (input: GridPointerInput): GridPointerHandlers => {
  const { raw, start, setStart, setTarget, landing, swallow } = input;
  const reset = () => {
    setStart(null);
    setTarget(null);
    landing.current = null;
  };
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      swallow.current = false;
      landing.current = null;
      setStart({ x: event.clientX, y: event.clientY });
      raw.onPointerDown(event);
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) >= DRAG_THRESHOLD) raw.onPointerMove(event);
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      const travelled = landing.current !== null;
      swallow.current = travelled;
      if (travelled) raw.onPointerUp(event);
      else raw.onPointerCancel();
      reset();
    },
    onPointerCancel: () => {
      raw.onPointerCancel();
      reset();
    },
  };
};

export { gridPointerHandlers };
