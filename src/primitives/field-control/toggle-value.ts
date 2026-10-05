/* @layer renderer-components @kind util */
const toggleValue = <T>(values: readonly T[], value: T): T[] =>
  (values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value]);

export { toggleValue };
