/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { FALLBACK, VIEW_MARGIN } from '../ControlMenu.constants';
import { shiftInto } from './shift-into';

const fitFallback = (popup: Element | null, view: Window): void => {
  if (!isHTMLElement(popup) || !popup.matches(FALLBACK)) return;
  const { offsetLeft: left, offsetTop: top, offsetWidth: width, offsetHeight: height } = popup;
  const dx = shiftInto(left, left + width, view.innerWidth, VIEW_MARGIN);
  const dy = shiftInto(top, top + height, view.innerHeight, VIEW_MARGIN);
  popup.style.translate = dx !== 0 || dy !== 0 ? `${dx}px ${dy}px` : '';
};

export { fitFallback };
