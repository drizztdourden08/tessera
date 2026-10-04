/* @layer stories @kind logic */
const formatGigabytes = (value: number): string => `${value.toFixed(value < 1 ? 2 : 1)} GB`;

export { formatGigabytes };
