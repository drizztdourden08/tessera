/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { FALLBACK_SELECTOR, MENU_MARGIN } from '../Widget.constants';
import { shiftInto } from './shift-into';

const fitInto = (view: Window, menuClass: string): void => {
  const menu = view.document.getElementsByClassName(menuClass).item(0);
  if (!isHTMLElement(menu) || !menu.matches(FALLBACK_SELECTOR)) return;
  const { offsetLeft: left, offsetTop: top, offsetWidth: width, offsetHeight: height } = menu;
  const dx = shiftInto(left, left + width, view.innerWidth, MENU_MARGIN);
  const dy = shiftInto(top, top + height, view.innerHeight, MENU_MARGIN);
  menu.style.translate = dx !== 0 || dy !== 0 ? `${dx}px ${dy}px` : '';
};

const useMenuInView = (open: boolean, triggerRef: RefObject<HTMLElement | null>, menuClass: string): void => {
  useLayoutEffect(() => {
    if (!open) return undefined;
    const view = ownerWindowOf(triggerRef.current);
    const fit = (): void => fitInto(view, menuClass);
    let frame = view.requestAnimationFrame(() => {
      frame = view.requestAnimationFrame(fit);
    });
    view.addEventListener('resize', fit);
    return () => {
      view.cancelAnimationFrame(frame);
      view.removeEventListener('resize', fit);
    };
  }, [open, triggerRef, menuClass]);
};

export { useMenuInView };
