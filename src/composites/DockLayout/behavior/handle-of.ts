/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { HANDLE_SELECTOR } from '../DockLayout.constants';

const handleOf = (target: EventTarget | null): HTMLElement | null => {
  if (!isHTMLElement(target)) return null;
  const button = target.closest('button');
  if (button && !button.hasAttribute('data-drag-tab')) return null;
  return target.closest<HTMLElement>(HANDLE_SELECTOR);
};

export { handleOf };
