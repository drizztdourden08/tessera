/* @layer renderer-components @kind logic */
import type { Point, Rect } from '../rect-drag/rect-drag.type';

const axisDelta = (at: number, span: { from: number; size: number }, edge: number, speed: number): number => {
  const reach = Math.min(edge, span.size / 2);
  if (reach <= 0) return 0;
  const before = span.from + reach - at;
  if (before > 0) return -Math.round(speed * Math.min(1, before / reach));
  const after = at - (span.from + span.size - reach);
  if (after > 0) return Math.round(speed * Math.min(1, after / reach));
  return 0;
};

const edgeScrollDelta = (pointer: Point, bounds: Rect, edge: number, speed: number): Point => ({
  x: axisDelta(pointer.x, { from: bounds.x, size: bounds.width }, edge, speed),
  y: axisDelta(pointer.y, { from: bounds.y, size: bounds.height }, edge, speed),
});

export { edgeScrollDelta };
