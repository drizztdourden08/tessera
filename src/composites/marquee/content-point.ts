/* @layer renderer-components @kind util */
import type { Point } from '../rect-drag/rect-drag.type';

const contentPoint = (container: HTMLElement, zoom: number, client: Point): Point => {
  const bounds = container.getBoundingClientRect();
  return {
    x: (client.x - bounds.left) / zoom - container.clientLeft + container.scrollLeft,
    y: (client.y - bounds.top) / zoom - container.clientTop + container.scrollTop,
  };
};

export { contentPoint };
