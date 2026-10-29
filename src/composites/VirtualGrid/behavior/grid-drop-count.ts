/* @layer renderer-components @kind logic */
const gridDropCount = (data: Pick<DataTransfer, 'items'>): number => Math.max(1, data.items.length);

export { gridDropCount };
