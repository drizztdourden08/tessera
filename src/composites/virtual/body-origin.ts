/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../primitives/dom/css-zoom-of';
import { contentPoint } from '../marquee/content-point';
import type { Point } from '../rect-drag/rect-drag.type';

const bodyOrigin = (root: HTMLElement, body: HTMLElement): Point => {
  const box = body.getBoundingClientRect();
  return contentPoint(root, cssZoomOf(root), { x: box.left, y: box.top });
};

export { bodyOrigin };
