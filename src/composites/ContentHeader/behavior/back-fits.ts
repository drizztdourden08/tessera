/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { BACK_CLASS, TITLE_CLASS } from '../ContentHeader.constants';

const pixels = (value: string): number => Number.parseFloat(value) || 0;

const naturalWidth = (element: HTMLElement, backWidth: number): number => {
  if (element.classList.contains(BACK_CLASS)) return backWidth;
  return element.classList.contains(TITLE_CLASS) ? element.scrollWidth : element.offsetWidth;
};

const backFits = (header: HTMLElement, backWidth: number): boolean => {
  const view = ownerWindowOf(header);
  const style = view.getComputedStyle(header);
  const parts = [...header.children]
    .map((child) => child as HTMLElement)
    .filter((child) => view.getComputedStyle(child).position !== 'absolute');
  const needed = parts.reduce((sum, part) => sum + naturalWidth(part, backWidth), 0) + pixels(style.columnGap) * (parts.length - 1);
  return needed <= header.clientWidth - pixels(style.paddingLeft) - pixels(style.paddingRight);
};

export { backFits };
