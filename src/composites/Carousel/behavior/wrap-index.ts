/* @layer renderer-components @kind logic */
const wrapIndex = (index: number, count: number): number => (count === 0 ? 0 : ((index % count) + count) % count);

export { wrapIndex };
