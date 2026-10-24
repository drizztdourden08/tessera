/* @layer renderer-components @kind util */
import { isElement } from '../../../primitives/dom/is-element';
import { TOOLBAR_DRAG_ATTRIBUTE } from '../ToolbarDock.constants';

const toolbarHandleOf = (target: EventTarget | null): string | null => {
  if (!isElement(target)) return null;
  return target.closest(`[${TOOLBAR_DRAG_ATTRIBUTE}]`)?.getAttribute(TOOLBAR_DRAG_ATTRIBUTE) ?? null;
};

export { toolbarHandleOf };
