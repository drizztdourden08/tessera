/* @layer renderer-components @kind logic */
import { DRAG_THRESHOLD } from './reorder.constants';
import type { PointerEvent } from 'react';
import type { ThresholdHandlers, ThresholdInput } from './threshold-handlers.type';

const thresholdHandlers = <K,>(input: ThresholdInput<K>): ThresholdHandlers => {
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

export { thresholdHandlers };
