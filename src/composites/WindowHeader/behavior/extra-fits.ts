/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { BACK_SELECTOR, CLOSE_SELECTOR, EXTRA_SELECTOR, TITLE_SELECTOR } from '../WindowHeader.constants';

const widthOf = (header: HTMLElement, selector: string, natural = false): number | null => {
  const element = header.querySelector<HTMLElement>(selector);
  if (!element) return null;
  return natural ? element.scrollWidth : element.offsetWidth;
};

const extraFits = (header: HTMLElement): boolean => {
  const extra = widthOf(header, EXTRA_SELECTOR);
  if (extra === null) return true;
  const parts = [widthOf(header, BACK_SELECTOR), widthOf(header, TITLE_SELECTOR, true), extra, widthOf(header, CLOSE_SELECTOR)]
    .filter((width) => width !== null);
  const gap = Number.parseFloat(ownerWindowOf(header).getComputedStyle(header).columnGap) || 0;
  const needed = parts.reduce((sum, width) => sum + width, 0) + gap * (parts.length - 1);
  return needed <= header.clientWidth;
};

export { extraFits };
