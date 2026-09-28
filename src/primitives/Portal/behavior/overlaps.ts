/* @layer renderer-components @kind util */
import type { Bounds } from './anchor-position.type';

const overlaps = (rect: Bounds, bounds: Bounds): boolean =>
  rect.bottom > bounds.top
  && rect.top < bounds.bottom
  && rect.right > bounds.left
  && rect.left < bounds.right;

export { overlaps };
