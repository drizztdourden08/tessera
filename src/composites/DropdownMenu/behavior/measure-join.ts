/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { MENU_ITEM_SELECTOR, MENU_SELECTOR } from './menu-items-of.constants';
import { subMenuJoin } from './sub-menu-join';
import type { SubMenuJoin } from './sub-menu-join.type';

const pixels = (text: string): number => Number.parseFloat(text) || 0;

const measureJoin = (row: HTMLElement, parent: HTMLElement, panel: HTMLElement): SubMenuJoin => {
  const view = ownerWindowOf(panel);
  const box = panel.getBoundingClientRect();
  const style = view.getComputedStyle(panel);
  const scroller = panel.querySelector<HTMLElement>(MENU_SELECTOR);
  const hidden = scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
  const first = panel.querySelector(MENU_ITEM_SELECTOR)?.getBoundingClientRect();
  return subMenuJoin({
    row: row.getBoundingClientRect(),
    parent: parent.getBoundingClientRect(),
    width: box.width,
    height: box.height + hidden,
    lead: first ? first.top - box.top : 0,
    line: pixels(style.borderTopWidth),
    ring: pixels(style.getPropertyValue('--menu-ring')),
    radius: pixels(style.borderBottomRightRadius),
    viewWidth: view.innerWidth,
    viewHeight: view.innerHeight,
  });
};

export { measureJoin };
