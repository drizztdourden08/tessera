/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const heightOf = (node: Element | null, before: number): number =>
  (isHTMLElement(node) && node.offsetHeight > 0 ? node.offsetHeight : before);

export { heightOf };
