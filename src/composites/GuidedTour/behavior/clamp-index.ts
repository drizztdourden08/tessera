/* @layer renderer-components @kind util */
const clampIndex = (index: number, total: number): number => Math.min(Math.max(0, Math.trunc(index)), Math.max(0, total - 1));

export { clampIndex };
