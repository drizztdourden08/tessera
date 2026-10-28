/* @layer renderer-components @kind logic */
import type { Rect } from '../rect-drag/rect-drag.type';
import { hitItems } from './hit-items';
import type { MarqueeItem } from './marquee.type';

const hitKeys = (area: Rect, items: readonly MarqueeItem[]): readonly string[] =>
  hitItems(area, items).map((item) => item.key);

export { hitKeys };
