/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { tagFit } from '../../../primitives/listbox/tag-fit';
import { FIT_SLACK } from '../ActionBar.constants';

const measureActions = (bar: HTMLElement, measure: HTMLElement, restCount: number): number => {
  const zoom = cssZoomOf(measure);
  const widths = [...measure.children].map((child) => child.getBoundingClientRect().width / zoom);
  const gap = Number.parseFloat(ownerWindowOf(measure).getComputedStyle(measure).columnGap) || 0;
  const rest = widths.slice(0, restCount);
  const more = widths[restCount] ?? 0;
  const primary = widths.slice(restCount + 1).reduce((sum, width) => sum + width + gap, 0);
  const room = bar.getBoundingClientRect().width / zoom + FIT_SLACK;
  return tagFit(rest, more, gap, room - primary);
};

export { measureActions };
