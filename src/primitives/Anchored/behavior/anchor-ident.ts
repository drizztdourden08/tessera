/* @layer renderer-components @kind util */
const anchorIdent = (id: string): string => `--anchored-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;

export { anchorIdent };
