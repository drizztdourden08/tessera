/* @layer renderer-components @kind logic */
import type { Rect } from '../rect-drag/rect-drag.type';
import { rectsIntersect } from './rects-intersect';
import type { MarqueeItem } from './marquee.type';

const hitKeys = (area: Rect, items: readonly MarqueeItem[]): readonly string[] =>
  items.filter((item) => rectsIntersect(area, item.rect)).map((item) => item.key);

export { hitKeys };
