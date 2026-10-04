/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import { nextFrame } from './performance-feed';
import { FEED_HISTORY, FEED_TICK_MS, FIRST_FRAME } from './performance-feed.constants';
import type { PerformanceFrame } from './performance-feed.type';

const warmFeed = (): PerformanceFrame => Array.from({ length: FEED_HISTORY }).reduce<PerformanceFrame>((frame) => nextFrame(frame), FIRST_FRAME);

const usePerformanceFeed = (): PerformanceFrame => {
  const [frame, setFrame] = useState(warmFeed);
  useEffect(() => {
    const timer = setInterval(() => setFrame(nextFrame), FEED_TICK_MS);
    return () => clearInterval(timer);
  }, []);
  return frame;
};

export { usePerformanceFeed };
