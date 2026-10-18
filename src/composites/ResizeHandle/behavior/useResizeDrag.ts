/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { applyDragOutcome } from './apply-drag-outcome';
import type { DragOrigin } from './drag-origin.type';
import { dragSignOf } from './drag-sign-of';
import { dragStep } from './drag-step';
import { pointerOf } from './pointer-of';
import type { ResizeOptions } from './resize-options.type';
import { snapDistanceOf } from './snap-distance-of';
import { startValueOf } from './start-value-of';
import { NO_SIDES } from './useResizeDrag.constants';

const useResizeDrag = (options: ResizeOptions) => {
  const latest = useRef(options);
  latest.current = options;
  const originRef = useRef<DragOrigin | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const origin = originRef.current;
    if (!origin) return;
    event.stopPropagation();
    originRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
    latest.current.onDragChange?.(false);
    if (origin.moved && origin.folded === null) latest.current.onResizeEnd?.(origin.last);
  }, []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    const { orientation, edge, pixelsPerUnit, onDragChange, fold } = latest.current;
    const handle = event.currentTarget;
    const scale = pixelsPerUnit ? pixelsPerUnit(handle) : 1;
    if (!(scale > 0)) return;
    event.preventDefault();
    event.stopPropagation();
    handle.focus();
    handle.setPointerCapture(event.pointerId);
    const start = startValueOf(latest.current);
    originRef.current = {
      pointer: pointerOf(event, orientation),
      start,
      last: start,
      pixelsPerUnit: scale,
      sign: dragSignOf(handle, orientation, edge),
      snap: fold ? snapDistanceOf(handle) / scale : 0,
      folded: fold?.folded ?? null,
      moved: false,
    };
    setDragging(true);
    onDragChange?.(true);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const origin = originRef.current;
    if (!origin) return;
    event.stopPropagation();
    if (event.buttons === 0) {
      onPointerUp(event);
      return;
    }
    const { orientation, min, max, fold } = latest.current;
    const step = dragStep(origin, pointerOf(event, orientation), { min, max, sides: fold?.sides ?? NO_SIDES });
    originRef.current = step.origin;
    applyDragOutcome(step.outcome, latest.current);
  }, [onPointerUp]);

  return { dragging, onPointerDown, onPointerMove, onPointerUp };
};

export { useResizeDrag };
