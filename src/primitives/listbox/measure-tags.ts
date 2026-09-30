/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../dom/owner-window';
import { tagFit } from './tag-fit';

const measureTags = (row: HTMLElement, measure: HTMLElement): number => {
  const widths = [...measure.children].map((child) => child.getBoundingClientRect().width);
  const plusWidth = widths.pop() ?? 0;
  const gap = Number.parseFloat(ownerWindowOf(measure).getComputedStyle(measure).columnGap) || 0;
  return tagFit(widths, plusWidth, gap, row.clientWidth);
};

export { measureTags };
