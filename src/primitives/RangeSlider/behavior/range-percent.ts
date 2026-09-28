/* @layer renderer-components @kind util */
const rangePercent = (index: number, last: number): number => (last === 0 ? 0 : (index / last) * 100);

export { rangePercent };
