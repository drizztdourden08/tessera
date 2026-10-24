/* @layer renderer-components @kind logic */
import type { Point } from '../rect-drag/rect-drag.type';

const clampPoint = (point: Point, width: number, height: number): Point => ({
  x: Math.min(Math.max(0, point.x), width),
  y: Math.min(Math.max(0, point.y), height),
});

export { clampPoint };
