/* @layer renderer-components @kind util */
import { edgeScrollDelta } from './edge-scroll-delta';
import { EDGE_SIZE, EDGE_SPEED } from './marquee.constants';
import type { Point } from '../rect-drag/rect-drag.type';

const scrollByEdge = (container: HTMLElement, pointer: Point): boolean => {
  const box = container.getBoundingClientRect();
  const bounds = { x: box.left, y: box.top, width: box.width, height: box.height };
  const delta = edgeScrollDelta(pointer, bounds, EDGE_SIZE, EDGE_SPEED);
  if (delta.x === 0 && delta.y === 0) return false;
  container.scrollLeft += delta.x;
  container.scrollTop += delta.y;
  return true;
};

export { scrollByEdge };
