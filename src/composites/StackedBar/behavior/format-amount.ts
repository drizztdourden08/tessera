/* @layer renderer-components @kind logic */
const formatAmount = (value: number): string => String(Math.round(value * 10) / 10);

export { formatAmount };
