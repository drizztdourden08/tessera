/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../primitives/dom/css-zoom-of';
import { elementRect } from './element-rect';
import { KEY_ATTRIBUTE } from './marquee.constants';
import type { MarqueeItem } from './marquee.type';

const marqueeItemRects = (container: HTMLElement, selector: string): readonly MarqueeItem[] => {
  const zoom = cssZoomOf(container);
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).flatMap((node) => {
    const key = node.getAttribute(KEY_ATTRIBUTE);
    return key === null ? [] : [{ key, rect: elementRect(container, zoom, node) }];
  });
};

export { marqueeItemRects };
