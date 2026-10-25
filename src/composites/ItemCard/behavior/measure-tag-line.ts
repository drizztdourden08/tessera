/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { tagFit } from '../../../primitives/listbox/tag-fit';

const measureTagLine = (row: HTMLElement, measure: HTMLElement, count: number): number => {
  const zoom = cssZoomOf(measure);
  const widths = [...measure.children].map((child) => child.getBoundingClientRect().width / zoom);
  const gap = Number.parseFloat(ownerWindowOf(measure).getComputedStyle(measure).columnGap) || 0;
  const more = widths[count] ?? 0;
  return tagFit(widths.slice(0, count), more, gap, row.getBoundingClientRect().width / zoom);
};

export { measureTagLine };
