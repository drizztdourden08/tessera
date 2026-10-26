/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { elementRect } from '../../marquee/element-rect';
import { ITEM_RECT_SELECTOR } from './row-rects.constants';
import type { Rect } from '../../rect-drag/rect-drag.type';

const domFlatRects = (root: HTMLElement): readonly Rect[] => {
  const zoom = cssZoomOf(root);
  return Array.from(root.querySelectorAll<HTMLElement>(ITEM_RECT_SELECTOR), (node) => elementRect(root, zoom, node));
};

export { domFlatRects };
