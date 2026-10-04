/* @layer renderer-components @kind util */
const isNode = (target: EventTarget): target is Node => typeof (target as Partial<Node>).nodeType === 'number';

export { isNode };
