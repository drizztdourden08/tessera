/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { MouseEvent, RefObject } from 'react';
import { cssZoomOf } from '../../dom/css-zoom-of';
import { ownerWindowOf } from '../../dom/owner-window';
import { pointerPlacement } from './pointer-placement';
import type { PointerSpot } from './pointer-placement.type';
import type { PointerFollow } from './usePointerFollow.type';

const usePointerFollow = (bubbleRef: RefObject<HTMLDivElement | null>): PointerFollow => {
  const pointerRef = useRef<PointerSpot | null>(null);

  const place = useCallback(() => {
    const bubble = bubbleRef.current;
    const pointer = pointerRef.current;
    if (!bubble || !pointer) return;
    const zoom = cssZoomOf(bubble);
    const view = ownerWindowOf(bubble);
    const spot = pointerPlacement({
      pointer: { x: pointer.x / zoom, y: pointer.y / zoom },
      bubble: { width: bubble.offsetWidth, height: bubble.offsetHeight },
      view: { width: view.innerWidth / zoom, height: view.innerHeight / zoom },
    });
    bubble.style.left = `${spot.x}px`;
    bubble.style.top = `${spot.y}px`;
  }, [bubbleRef]);

  const attach = useCallback((node: HTMLDivElement | null) => {
    bubbleRef.current = node;
    place();
  }, [bubbleRef, place]);

  const track = useCallback((event: MouseEvent<HTMLElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    place();
  }, [place]);

  return { attach, track };
};

export { usePointerFollow };
