/* @layer renderer-components @kind logic */
import { EDGE_EPSILON } from './strip-geometry.constants';
import { isOverflowing } from './is-overflowing';
import { maxScrollOf } from './max-scroll-of';
import type { StripMetrics } from './strip-geometry.type';
import type { WheelGesture } from './wheel-scroll-delta.type';

const wheelScrollDelta = (gesture: WheelGesture, metrics: StripMetrics): number | null => {
  const { deltaX, deltaY } = gesture;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) return null;
  if (!isOverflowing(metrics)) return null;

  const room = deltaY < 0
    ? -metrics.scrollLeft
    : maxScrollOf(metrics) - metrics.scrollLeft;
  if (Math.abs(room) <= EDGE_EPSILON) return null;

  return deltaY < 0 ? Math.max(deltaY, room) : Math.min(deltaY, room);
};

export { wheelScrollDelta };
