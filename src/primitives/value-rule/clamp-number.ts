/* @layer renderer-components @kind util */
const clampNumber = (value: number, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY): number =>
  Math.max(min, Math.min(value, max));

export { clampNumber };
