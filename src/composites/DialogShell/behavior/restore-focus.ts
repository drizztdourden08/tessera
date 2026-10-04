/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const restoreFocus = (doc: Document, dialog: HTMLElement, opener: Element | null): void => {
  if (!isHTMLElement(opener) || !opener.isConnected) return;
  const active = doc.activeElement;
  if (active === null || active === doc.body || dialog.contains(active)) opener.focus();
};

export { restoreFocus };
