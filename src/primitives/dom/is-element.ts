/* @layer renderer-components @kind util */
const isElement = (value: unknown): value is Element =>
  typeof value === 'object' && value !== null && (value as Node).nodeType === 1;

export { isElement };
