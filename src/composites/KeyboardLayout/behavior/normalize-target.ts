/* @layer renderer-components @kind util */
const normalizeTarget = (target: string): string => (target.length === 1 ? target.toUpperCase() : target);

export { normalizeTarget };
