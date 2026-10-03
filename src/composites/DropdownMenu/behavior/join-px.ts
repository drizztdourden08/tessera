/* @layer renderer-components @kind util */
const joinPx = (value: number): string => `${Math.round(value * 100) / 100}px`;

export { joinPx };
