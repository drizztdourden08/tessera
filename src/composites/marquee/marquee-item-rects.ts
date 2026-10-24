/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../primitives/dom/css-zoom-of';
import { KEY_ATTRIBUTE } from './marquee.constants';
import { contentPoint } from './content-point';
import type { MarqueeItem } from './marquee.type';

const marqueeItemRects = (container: HTMLElement, selector: string): readonly MarqueeItem[] => {
  const zoom = cssZoomOf(container);
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).flatMap((node) => {
    const key = node.getAttribute(KEY_ATTRIBUTE);
    if (key === null) return [];
    const box = node.getBoundingClientRect();
    const corner = contentPoint(container, zoom, { x: box.left, y: box.top });
    return [{ key, rect: { x: corner.x, y: corner.y, width: box.width / zoom, height: box.height / zoom } }];
  });
};

export { marqueeItemRects };
