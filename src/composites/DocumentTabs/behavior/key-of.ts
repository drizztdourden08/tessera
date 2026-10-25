/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { TAB_OR_CLOSE } from '../DocumentTabs.constants';

const keyOf = (target: EventTarget | null): string | null => {
  const part = isHTMLElement(target) ? target.closest<HTMLElement>(TAB_OR_CLOSE) : null;
  return part?.dataset.reorderKey ?? part?.dataset.closeKey ?? null;
};

export { keyOf };
