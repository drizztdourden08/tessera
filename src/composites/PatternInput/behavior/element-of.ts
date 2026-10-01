/* @layer renderer-components @kind util */
import { ELEMENT_NODE } from './pattern-focus.constants';

const elementOf = (node: Node): Element | null => (node.nodeType === ELEMENT_NODE ? (node as Element) : node.parentElement);

export { elementOf };
