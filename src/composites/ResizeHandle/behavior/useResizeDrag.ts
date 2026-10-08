/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { DragOrigin } from './drag-origin.type';
import { dragSignOf } from './drag-sign-of';
import { pointerOf } from './pointer-of';
import type { ResizeOptions } from './resize-options.type';
import { startValueOf } from './start-value-of';

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
    if (origin.last !== origin.start) latest.current.onResizeEnd?.(origin.last);
  }, []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    const { orientation, edge, pixelsPerUnit, onDragChange } = latest.current;
    const handle = event.currentTarget;
    const scale = pixelsPerUnit ? pixelsPerUnit(handle) : 1;
    if (!(scale > 0)) return;
    event.preventDefault();
    event.stopPropagation();
    handle.focus();
    handle.setPointerCapture(event.pointerId);
    const start = startValueOf(latest.current);
    originRef.current = { pointer: pointerOf(event, orientation), start, last: start, pixelsPerUnit: scale, sign: dragSignOf(handle, orientation, edge) };
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
    const { orientation, min, max, onResize } = latest.current;
    const moved = (pointerOf(event, orientation) - origin.pointer) / origin.pixelsPerUnit;
    const next = clampNumber(origin.start + origin.sign * moved, min, max);
    if (next === origin.last) return;
    const from = origin.last;
    origin.last = next;
    onResize(next, { from, by: 'drag' });
  }, [onPointerUp]);

  return { dragging, onPointerDown, onPointerMove, onPointerUp };
};

export { useResizeDrag };
