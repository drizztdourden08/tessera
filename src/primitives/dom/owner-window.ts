/* @layer renderer-components @kind util */
import { ownerDocumentOf } from './owner-document';

const ownerWindowOf = (node: Node | null | undefined): Window => ownerDocumentOf(node).defaultView ?? window;

export { ownerWindowOf };
