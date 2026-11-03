/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import { usePageVisible } from '../../dom/usePageVisible';
import { useReducedMotion } from '../../dom/useReducedMotion';
import { MIN_FRAME_MS } from '../PixelThumbnail.constants';
import type { FrameClockParams } from '../PixelThumbnail.type';

const useFrameClock = (params: FrameClockParams): number => {
  const { frames, playing, frameRef } = params;
  const reduced = useReducedMotion(frameRef);
  const visible = usePageVisible(frameRef);
  const count = frames?.length ?? 0;
  const running = playing && !reduced && visible && count > 1;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!running || !frames) return undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (at: number) => {
      const wait = Math.max(MIN_FRAME_MS, frames[at]?.durationMs ?? MIN_FRAME_MS);
      timer = setTimeout(() => {
        const next = (at + 1) % frames.length;
        setIndex(next);
        schedule(next);
      }, wait);
    };
    schedule(0);
    return () => {
      clearTimeout(timer);
      setIndex(0);
    };
  }, [running, frames]);
  return running ? index : 0;
};

export { useFrameClock };
