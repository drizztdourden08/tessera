/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import type { Rect } from '../../rect-drag/rect-drag.type';

const frameRect = (frame: HTMLElement): Rect => {
  const zoom = cssZoomOf(frame);
  const box = frame.getBoundingClientRect();
  const room = frame.parentElement?.getBoundingClientRect() ?? box;
  return { x: (box.left - room.left) / zoom, y: (box.top - room.top) / zoom, width: box.width / zoom, height: box.height / zoom };
};

export { frameRect };
