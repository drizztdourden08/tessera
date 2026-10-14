/* @layer renderer-components @kind util */
import { POINTER_OFFSET, VIEWPORT_EDGE } from './pointer-placement.constants';
import type { PointerRoom, PointerSpot } from './pointer-placement.type';

const along = (at: number, length: number, room: number): number => {
  const after = at + POINTER_OFFSET;
  if (after + length <= room - VIEWPORT_EDGE) return after;
  return Math.max(VIEWPORT_EDGE, at - length - POINTER_OFFSET);
};

const pointerPlacement = ({ pointer, bubble, view }: PointerRoom): PointerSpot => ({
  x: along(pointer.x, bubble.width, view.width),
  y: along(pointer.y, bubble.height, view.height),
});

export { pointerPlacement };
