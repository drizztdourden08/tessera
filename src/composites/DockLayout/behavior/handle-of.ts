/* @layer renderer-components @kind logic */
import { isElement } from '../../../primitives/dom/is-element';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { HANDLE_SELECTOR } from '../DockLayout.constants';

const handleOf = (target: EventTarget | null): HTMLElement | null => {
  if (!isElement(target)) return null;
  const button = target.closest('button');
  if (button && !button.hasAttribute('data-drag-tab')) return null;
  const handle = target.closest(HANDLE_SELECTOR);
  return isHTMLElement(handle) ? handle : null;
};

export { handleOf };
