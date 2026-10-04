/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { FOCUSABLE } from '../ControlMenu.constants';

const focusFirst = (root: HTMLElement | null): boolean => {
  const target = root?.querySelector(FOCUSABLE);
  if (!isHTMLElement(target)) return false;
  target.focus();
  return true;
};

export { focusFirst };
