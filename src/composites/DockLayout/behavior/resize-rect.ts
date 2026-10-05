/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { RESIZE_SIDES } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { Point } from './drag.type';
import type { AxisLimits, AxisSpan, ResizeEdge, ResizeLimits, ResizeSide } from './float-resize.type';

const resizeAxis = (span: AxisSpan, delta: number, limits: AxisLimits, side: ResizeSide): [number, number] => {
  const { from, size } = span;
  const { lo, hi, min } = limits;
  const least = Math.min(min, hi - lo);
  if (side === 1) return [from, clampNumber(size + delta, least, hi - from)];
  if (side === 0) return [from, size];
  const end = from + size;
  const at = clampNumber(from + delta, lo, end - least);
  return [at, end - at];
};

const resizeRect = (start: Rect, edge: ResizeEdge, delta: Point, limits: ResizeLimits): Rect => {
  const { bounds, min } = limits;
  const sides = RESIZE_SIDES[edge];
  const across = { lo: bounds.x, hi: bounds.x + bounds.width, min: min.width };
  const down = { lo: bounds.y, hi: bounds.y + bounds.height, min: min.height };
  const [x, width] = resizeAxis({ from: start.x, size: start.width }, delta.x, across, sides.x);
  const [y, height] = resizeAxis({ from: start.y, size: start.height }, delta.y, down, sides.y);
  return { x, y, width, height };
};

export { resizeRect };
