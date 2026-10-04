/* @layer renderer-components @kind logic */
import { CONTROLS_SELECTOR, ITEM_ATTRIBUTE, ITEM_AWAY_CLASS, ITEM_SELECTOR, LOGO_SELECTOR, PROBE_SELECTOR, START_SELECTOR } from '../WindowTitleBar.constants';
import type { BarItemSize, BarSizes } from './fit-step.type';

const gapOf = (element: HTMLElement | null): number => {
  if (!element) return 0;
  const gap = Number.parseFloat(element.ownerDocument.defaultView?.getComputedStyle(element).columnGap ?? '');
  return Number.isNaN(gap) ? 0 : gap;
};

const itemSizes = (bar: HTMLElement, order: readonly string[], start: HTMLElement | null): BarItemSize[] => {
  const byId = new Map<string, HTMLElement>();
  bar.querySelectorAll<HTMLElement>(ITEM_SELECTOR).forEach((element) => byId.set(element.getAttribute(ITEM_ATTRIBUTE) ?? '', element));
  return order.map((id) => {
    const element = byId.get(id);
    if (!element) return { side: 'start', width: 0, shown: false };
    return {
      side: start?.contains(element) ? 'start' : 'end',
      width: element.offsetWidth,
      shown: !element.classList.contains(ITEM_AWAY_CLASS),
    };
  });
};

const measureBar = (bar: HTMLElement, brand: HTMLElement, order: readonly string[]): BarSizes => {
  const width = bar.clientWidth;
  const start = bar.querySelector<HTMLElement>(START_SELECTOR);
  const controls = bar.querySelector<HTMLElement>(CONTROLS_SELECTOR);
  return {
    width,
    startEnd: start ? start.offsetLeft + start.offsetWidth : 0,
    endWidth: controls ? width - controls.offsetLeft : 0,
    startGap: gapOf(start),
    endGap: gapOf(controls),
    items: itemSizes(bar, order, start),
    brand: brand.offsetWidth,
    logo: brand.querySelector<HTMLElement>(LOGO_SELECTOR)?.offsetWidth ?? 0,
    small: bar.querySelector<HTMLElement>(PROBE_SELECTOR)?.offsetWidth ?? 0,
  };
};

export { measureBar };
