/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { tagFit } from '../../../primitives/listbox/tag-fit';
import { FIT_SLACK } from '../ActionBar.constants';
import type { FitAxis } from '../ActionBar.type';

const measureActions = (bar: HTMLElement, measure: HTMLElement, restCount: number, axis: FitAxis = 'width'): number => {
  const zoom = cssZoomOf(measure);
  const widths = [...measure.children].map((child) => child.getBoundingClientRect()[axis] / zoom);
  const gap = Number.parseFloat(ownerWindowOf(measure).getComputedStyle(measure).columnGap) || 0;
  const rest = widths.slice(0, restCount);
  const more = widths[restCount] ?? 0;
  const primary = widths.slice(restCount + 1).reduce((sum, width) => sum + width + gap, 0);
  const room = bar.getBoundingClientRect()[axis] / zoom + FIT_SLACK;
  return tagFit(rest, more, gap, room - primary);
};

export { measureActions };
