/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { TOOLBAR_DRAG_ATTRIBUTE } from '../ToolbarDock.constants';

const focusToolbarHandle = (root: HTMLElement, id: string): void => {
  const handles = Array.from(root.querySelectorAll(`[${TOOLBAR_DRAG_ATTRIBUTE}]`));
  const handle = handles.find((candidate) => candidate.getAttribute(TOOLBAR_DRAG_ATTRIBUTE) === id);
  if (isHTMLElement(handle)) handle.focus();
};

export { focusToolbarHandle };
