/* @layer renderer-components @kind logic */
import { CONTROLS_SELECTOR, ITEM_AWAY_CLASS, START_SELECTOR } from '../WindowTitleBar.constants';
import type { BarItemPlace } from './bar-slide.type';

const itemPlace = (item: HTMLElement): BarItemPlace => {
  const container = item.closest<HTMLElement>(START_SELECTOR) ?? item.closest<HTMLElement>(CONTROLS_SELECTOR);
  const away = item.classList.contains(ITEM_AWAY_CLASS);
  if (!container) return { offset: 0, out: 0, away };
  const rtl = item.ownerDocument.defaultView?.getComputedStyle(container).direction === 'rtl';
  const atEnd = container.matches(CONTROLS_SELECTOR);
  const box = container.getBoundingClientRect();
  const anchor = atEnd === rtl ? box.left : box.right;
  const towardsEdge = atEnd === rtl ? -1 : 1;
  return { offset: item.getBoundingClientRect().left - anchor, out: towardsEdge * item.offsetWidth, away };
};

export { itemPlace };
