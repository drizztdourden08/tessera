/* @layer renderer-components @kind logic */
const gridRows = (count: number, columns: number): number => (count <= 0 ? 0 : Math.ceil(count / Math.max(1, columns)));

export { gridRows };
