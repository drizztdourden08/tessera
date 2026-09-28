/* @layer renderer-components @kind util */
import type { Bounds } from './anchor-position.type';

const viewportBounds = (): Bounds => ({
  top: 0,
  right: window.innerWidth,
  bottom: window.innerHeight,
  left: 0,
});

export { viewportBounds };
