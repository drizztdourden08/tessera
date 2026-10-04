/* @layer stories @kind data */
import { MANY_SEGMENTS } from './chart-samples.constants';
import type { PerformanceFrame } from './performance-feed.type';

const FEED_HISTORY = 40;

const FEED_TICK_MS = 1000;

const MEMORY_TOTAL = 16;

const FIRST_FRAME: PerformanceFrame = {
  tick: 0,
  seed: 20261004,
  cpu: 34,
  gpu: 58,
  heat: 61,
  fps: [138, 141, 144, 142, 139, 143, 144, 140],
  download: [12, 18, 9, 22, 31, 18, 14, 26],
  upload: [3, 4, 2, 5, 6, 4, 3, 5],
  processes: MANY_SEGMENTS.slice(0, 12),
};

export { FEED_HISTORY, FEED_TICK_MS, FIRST_FRAME, MEMORY_TOTAL };
