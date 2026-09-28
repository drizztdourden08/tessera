/* @layer renderer-components @kind util */
import type { Bounds } from './anchor-position.type';

const viewportBounds = (view: Window = window): Bounds => ({
  top: 0,
  right: view.innerWidth,
  bottom: view.innerHeight,
  left: 0,
});

export { viewportBounds };
