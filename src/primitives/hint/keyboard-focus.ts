/* @layer renderer-components @kind util */
import { isHTMLElement } from '../dom/is-html-element';

const keyboardFocus = (target: EventTarget | null): boolean => {
  if (!isHTMLElement(target)) return false;
  try {
    return target.matches(':focus-visible');
  } catch {
    return true;
  }
};

export { keyboardFocus };
