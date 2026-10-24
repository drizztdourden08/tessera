/* @layer renderer-components @kind logic */
import type { Point } from '../rect-drag/rect-drag.type';

const passedThreshold = (from: Point, to: Point, threshold: number): boolean =>
  Math.hypot(to.x - from.x, to.y - from.y) >= threshold;

export { passedThreshold };
