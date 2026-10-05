/* @layer renderer-components @kind logic */
const storedOpen = (stored: unknown): boolean | undefined => (typeof stored === 'boolean' ? stored : undefined);

export { storedOpen };
