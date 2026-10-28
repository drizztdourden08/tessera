/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { releasePointer } from '../../NumberField/behavior/release-pointer';
import type { DialDragParams, DialHandlers } from '../AngleField.type';
import { angleAt } from './angle-at';
import { snapAngle } from './snap-angle';

const useDialDrag = (params: DialDragParams): DialHandlers | undefined => {
  const dragging = useRef(false);
  const latest = useRef(params);
  latest.current = params;
  if (!params.enabled) return undefined;

  const turn = (event: PointerEvent<HTMLElement>): void => {
    const raw = angleAt({ x: event.clientX, y: event.clientY }, event.currentTarget.getBoundingClientRect());
    latest.current.onChange(snapAngle(raw, event.shiftKey ? undefined : latest.current.snap));
  };
  const release = (event: PointerEvent<HTMLElement>): void => {
    dragging.current = false;
    releasePointer(event);
  };

  return {
    onPointerDown: (event) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragging.current = true;
      turn(event);
    },
    onPointerMove: (event) => {
      if (dragging.current) turn(event);
    },
    onPointerUp: release,
    onPointerCancel: release,
  };
};

export { useDialDrag };
