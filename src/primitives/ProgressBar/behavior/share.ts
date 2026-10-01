/* @layer renderer-components @kind util */
const share = (value: number, max: number): number => (max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0);

export { share };
