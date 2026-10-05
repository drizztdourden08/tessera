/* @layer renderer-components @kind util */
const focusLost = (doc: Document): boolean => doc.activeElement === null || doc.activeElement === doc.body;

export { focusLost };
