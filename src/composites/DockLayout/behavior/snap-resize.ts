/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import type { AxisLimits, AxisSpan, ResizeSide } from '../../rect-drag/rect-drag.type';
import type { SnapResize } from './float-resize.type';
import { snapShifts } from './snap-shifts';
import type { SnapLine, SnapLines } from './snap.type';

const shifted = (span: AxisSpan, side: ResizeSide, shift: number): AxisSpan =>
  (side === 1 ? { from: span.from, size: span.size + shift } : { from: span.from + shift, size: span.size - shift });

const fits = (span: AxisSpan, limits: AxisLimits): boolean =>
  span.size >= Math.min(limits.min, limits.hi - limits.lo) && span.from >= limits.lo && span.from + span.size <= limits.hi;

const shiftsFor = (span: AxisSpan, side: ResizeSide, lines: readonly SnapLine[], distance: number): number[] => {
  if (side === 0) return [];
  return snapShifts([side === 1 ? span.from + span.size : span.from], lines, distance);
};

const snapAxis = (span: AxisSpan, side: ResizeSide, shifts: readonly number[], limits: AxisLimits): AxisSpan =>
  shifts.map((shift) => shifted(span, side, shift)).find((s) => fits(s, limits)) ?? span;

const snapResize = (rect: Rect, lines: SnapLines, distance: number, resize: SnapResize): Rect => {
  if (distance <= 0) return rect;
  const { sides, bounds, min } = resize;
  const spanX = { from: rect.x, size: rect.width };
  const spanY = { from: rect.y, size: rect.height };
  const limitsX = { lo: bounds.x, hi: bounds.x + bounds.width, min: min.width };
  const limitsY = { lo: bounds.y, hi: bounds.y + bounds.height, min: min.height };
  const across = snapAxis(spanX, sides.x, shiftsFor(spanX, sides.x, lines.x, distance), limitsX);
  const down = snapAxis(spanY, sides.y, shiftsFor(spanY, sides.y, lines.y, distance), limitsY);
  return { x: across.from, y: down.from, width: across.size, height: down.size };
};

export { snapResize };
