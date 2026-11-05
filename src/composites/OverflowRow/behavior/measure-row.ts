/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { FIT_SLACK } from '../OverflowRow.constants';
import type { OverflowRowItem } from '../OverflowRow.type';
import { foldItems } from './fold-items';

const measureRow = (row: HTMLElement, measure: HTMLElement, items: readonly OverflowRowItem[]): readonly string[] => {
  const zoom = cssZoomOf(measure);
  const widths = [...measure.children].map((child) => child.getBoundingClientRect().width / zoom);
  const gap = Number.parseFloat(ownerWindowOf(measure).getComputedStyle(measure).columnGap) || 0;
  const room = row.getBoundingClientRect().width / zoom + FIT_SLACK;
  return foldItems({ items, widths: widths.slice(0, items.length), moreWidth: widths[items.length] ?? 0, gap, room });
};

export { measureRow };
