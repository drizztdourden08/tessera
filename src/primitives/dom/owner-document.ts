/* @layer renderer-components @kind util */
const ownerDocumentOf = (node: Node | null | undefined): Document => node?.ownerDocument ?? document;

export { ownerDocumentOf };
