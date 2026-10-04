/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { ITEM_ATTRIBUTE, ITEM_SELECTOR } from '../WindowTitleBar.constants';
import type { BarItemSnapshot, BarSnapshot } from './bar-slide.type';
import { itemPlace } from './item-place';

const captureItem = (item: HTMLElement): BarItemSnapshot => {
  const style = ownerWindowOf(item).getComputedStyle(item);
  const opacity = Number.parseFloat(style.opacity);
  const { offset, away } = itemPlace(item);
  return { offset, opacity, seen: style.visibility === 'visible' && opacity > 0, away };
};

const captureBar = (bar: HTMLElement): BarSnapshot =>
  new Map(Array.from(bar.querySelectorAll<HTMLElement>(ITEM_SELECTOR), (item) => [item.getAttribute(ITEM_ATTRIBUTE) ?? '', captureItem(item)]));

export { captureBar };
