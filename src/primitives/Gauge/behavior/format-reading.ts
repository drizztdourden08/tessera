/* @layer renderer-components @kind logic */
const formatReading = (value: number): string => (Number.isFinite(value) ? String(Math.round(value)) : '');

export { formatReading };
