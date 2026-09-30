/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const isTyping = (target: EventTarget | null): boolean =>
  isHTMLElement(target) && (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

export { isTyping };
