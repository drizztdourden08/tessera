/* @layer renderer-components @kind util */
const initialSpeed = (speeds: readonly number[]): number => (speeds.includes(1) ? 1 : (speeds[0] ?? 1));

export { initialSpeed };
