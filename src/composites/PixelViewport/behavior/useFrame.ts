/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { FrameCache, FrameInput } from './viewport.type';
import { paintFrame } from './paint-frame';

const useFrame = (rootRef: RefObject<HTMLElement | null>, canvasRef: RefObject<HTMLCanvasElement | null>, frame: FrameInput): (() => void) => {
  const input = useRef(frame);
  const pending = useRef<number | null>(null);
  const cache = useRef<FrameCache>({ tile: null, tileKey: '', scratch: null });

  const schedule = useCallback(() => {
    const root = rootRef.current;
    if (!root || pending.current !== null) return;
    pending.current = ownerWindowOf(root).requestAnimationFrame(() => {
      pending.current = null;
      const canvas = canvasRef.current;
      if (canvas && rootRef.current) paintFrame(canvas, rootRef.current, input.current, cache.current);
    });
  }, [rootRef, canvasRef]);

  const { target, box, image, draw, source, gridFrom } = frame;
  useLayoutEffect(() => {
    input.current = { target, box, image, draw, source, gridFrom };
    schedule();
  }, [target, box, image, draw, source, gridFrom, schedule]);

  useEffect(() => {
    const view = ownerWindowOf(rootRef.current);
    return () => {
      if (pending.current !== null) view.cancelAnimationFrame(pending.current);
      pending.current = null;
    };
  }, [rootRef]);

  return schedule;
};

export { useFrame };
