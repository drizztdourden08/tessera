/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../primitives/dom/is-html-element';
import { ownerWindowOf } from '../../primitives/dom/owner-window';
import { SCROLLING_OVERFLOW } from './virtual.constants';

const scrolls = (node: HTMLElement): boolean => {
  const style = ownerWindowOf(node).getComputedStyle(node);
  return SCROLLING_OVERFLOW.has(style.overflowX) || SCROLLING_OVERFLOW.has(style.overflowY);
};

const findScrollParent = (start: HTMLElement): HTMLElement | null => {
  let node = start.parentElement;
  while (isHTMLElement(node) && !scrolls(node)) node = node.parentElement;
  return isHTMLElement(node) ? node : null;
};

export { findScrollParent };
