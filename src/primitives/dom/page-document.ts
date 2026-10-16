/* @layer renderer-components @kind util */
const pageDocument = (): Document | undefined => (typeof document === 'undefined' ? undefined : document);

export { pageDocument };
