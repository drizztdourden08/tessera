/* @layer renderer-components @kind logic */
import type { Point, Rect } from '../rect-drag/rect-drag.type';

const rectFromPoints = (a: Point, b: Point): Rect => ({
  x: Math.min(a.x, b.x),
  y: Math.min(a.y, b.y),
  width: Math.abs(a.x - b.x),
  height: Math.abs(a.y - b.y),
});

export { rectFromPoints };
