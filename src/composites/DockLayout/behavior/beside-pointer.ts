/* @layer renderer-components @kind logic */
import type { Rect, Size } from '../DockLayout.type';
import type { BesidePlace } from './beside-pointer.type';
import type { Point } from './drag.type';

const afterOrBefore = (at: number, length: number, span: [number, number], offset: number): number => {
  const [lo, hi] = span;
  const after = at + offset;
  const start = after + length <= hi ? after : at - offset - length;
  return Math.max(lo, Math.min(start, hi - length));
};

const besidePointer = (pointer: Point, size: Size, area: Rect, offset: number): BesidePlace => ({
  left: afterOrBefore(pointer.x, size.width, [area.x, area.x + area.width], offset),
  top: afterOrBefore(pointer.y, size.height, [area.y, area.y + area.height], offset),
});

export { besidePointer };
