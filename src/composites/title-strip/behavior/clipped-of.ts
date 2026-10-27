/* @layer renderer-components @kind logic */
const clippedOf = (nodes: readonly (HTMLElement | null)[]): boolean =>
  nodes.some((node) => node !== null && node.scrollWidth > node.clientWidth);

export { clippedOf };
