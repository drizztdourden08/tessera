/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { BarSnapshot } from './bar-slide.type';
import { captureBar } from './capture-bar';
import { playBarSlide } from './play-bar-slide';

const useBarSlide = (barRef: RefObject<HTMLElement | null>): (() => void) => {
  const snapshot = useRef<BarSnapshot | null>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const before = snapshot.current;
    if (!bar || !before) return;
    snapshot.current = null;
    playBarSlide(bar, before);
  });

  return useCallback(() => {
    const bar = barRef.current;
    if (bar) snapshot.current = captureBar(bar);
  }, [barRef]);
};

export { useBarSlide };
