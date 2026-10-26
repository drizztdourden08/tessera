/* @layer renderer-components @kind util */
import { contentPoint } from './content-point';
import type { Rect } from '../rect-drag/rect-drag.type';

const elementRect = (container: HTMLElement, zoom: number, node: HTMLElement): Rect => {
  const box = node.getBoundingClientRect();
  const corner = contentPoint(container, zoom, { x: box.left, y: box.top });
  return { x: corner.x, y: corner.y, width: box.width / zoom, height: box.height / zoom };
};

export { elementRect };
