/* @layer renderer-components @kind logic */
const storedSize = (stored: unknown): number | undefined => (typeof stored === 'number' && Number.isFinite(stored) ? stored : undefined);

export { storedSize };
