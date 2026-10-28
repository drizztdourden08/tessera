/* @layer renderer-components @kind logic */
import { rectsIntersect } from './rects-intersect';
import type { Rect } from '../rect-drag/rect-drag.type';
import type { MarqueeItem } from './marquee.type';

const hitItems = (area: Rect, items: readonly MarqueeItem[]): readonly MarqueeItem[] =>
  items.filter((item) => rectsIntersect(area, item.rect));

export { hitItems };
