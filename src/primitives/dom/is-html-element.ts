/* @layer renderer-components @kind util */
const isHTMLElement = (value: unknown): value is HTMLElement =>
  typeof value === 'object' && value !== null && (value as Node).nodeType === 1 && 'offsetHeight' in value;

export { isHTMLElement };
