/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import type { Rect } from '../../rect-drag/rect-drag.type';
import { OVERHANG_SELECTOR } from '../ScreenLayer.constants';

const moveBounds = (frame: HTMLElement): Rect => {
  const zoom = cssZoomOf(frame);
  const box = frame.getBoundingClientRect();
  const parts = [...frame.querySelectorAll(OVERHANG_SELECTOR)].map((part) => part.getBoundingClientRect());
  const left = Math.max(0, ...parts.map((part) => box.left - part.left)) / zoom;
  const top = Math.max(0, ...parts.map((part) => box.top - part.top)) / zoom;
  const right = Math.max(0, ...parts.map((part) => part.right - box.right)) / zoom;
  const bottom = Math.max(0, ...parts.map((part) => part.bottom - box.bottom)) / zoom;
  const room = frame.parentElement;
  const width = (room?.clientWidth ?? 0) - left - right;
  const height = (room?.clientHeight ?? 0) - top - bottom;
  return { x: left, y: top, width: Math.max(0, width), height: Math.max(0, height) };
};

export { moveBounds };
