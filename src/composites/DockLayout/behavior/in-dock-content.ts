/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const inDockContent = (target: EventTarget | null): boolean =>
  isHTMLElement(target) && target.closest('[data-dock-content]') !== null;

export { inDockContent };
