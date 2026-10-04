/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { cssZoomOf } from './css-zoom-of';
import { MENU_ITEM_SELECTOR, MENU_SELECTOR } from './menu-items-of.constants';
import { subMenuJoin } from './sub-menu-join';
import type { JoinCorners, JoinRect, SubMenuJoin } from './sub-menu-join.type';

const pixels = (text: string): number => Number.parseFloat(text) || 0;

const cornersOf = (style: CSSStyleDeclaration): JoinCorners => ({
  topLeft: pixels(style.borderTopLeftRadius),
  topRight: pixels(style.borderTopRightRadius),
  bottomLeft: pixels(style.borderBottomLeftRadius),
  bottomRight: pixels(style.borderBottomRightRadius),
});

const scaled = (rect: DOMRect, zoom: number): JoinRect => ({
  top: rect.top / zoom, bottom: rect.bottom / zoom, left: rect.left / zoom, right: rect.right / zoom,
});

const measureJoin = (row: HTMLElement, parent: HTMLElement, panel: HTMLElement): SubMenuJoin => {
  const view = ownerWindowOf(panel);
  const zoom = cssZoomOf(panel);
  const box = panel.getBoundingClientRect();
  const style = view.getComputedStyle(panel);
  const scroller = panel.querySelector<HTMLElement>(MENU_SELECTOR);
  const hidden = scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
  const first = panel.querySelector(MENU_ITEM_SELECTOR)?.getBoundingClientRect();
  return subMenuJoin({
    row: scaled(row.getBoundingClientRect(), zoom),
    parent: scaled(parent.getBoundingClientRect(), zoom),
    parentCorners: cornersOf(view.getComputedStyle(parent)),
    width: box.width / zoom,
    height: box.height / zoom + hidden,
    lead: first ? (first.top - box.top) / zoom : 0,
    line: pixels(style.borderTopWidth),
    ring: pixels(style.getPropertyValue('--menu-ring')),
    radius: pixels(style.borderBottomRightRadius),
    gap: pixels(style.getPropertyValue('--menu-gap')),
    viewWidth: view.innerWidth / zoom,
    viewHeight: view.innerHeight / zoom,
  });
};

export { measureJoin };
