/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ROW_ID } from '../ItemList.constants';

const rowIdOf = (target: EventTarget | null): string | null =>
  (isHTMLElement(target) ? target.closest(`[${ROW_ID}]`)?.getAttribute(ROW_ID) ?? null : null);

export { rowIdOf };
