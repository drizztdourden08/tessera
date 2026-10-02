/* @layer renderer-components @kind util */
const asNode = (target: EventTarget | null): Node | null =>
  target !== null && 'nodeType' in target ? (target as Node) : null;

export { asNode };
