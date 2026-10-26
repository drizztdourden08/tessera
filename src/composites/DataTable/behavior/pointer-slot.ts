/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { contentPoint } from '../../marquee/content-point';
import { rowInsertion } from './row-insertion';
import type { Rect } from '../../rect-drag/rect-drag.type';

const pointerSlot = (root: HTMLElement, rects: readonly Rect[], point: { clientX: number; clientY: number }): number => {
  const { y } = contentPoint(root, cssZoomOf(root), { x: point.clientX, y: point.clientY });
  return rowInsertion(rects.map((rect) => ({ rect })), y);
};

export { pointerSlot };
