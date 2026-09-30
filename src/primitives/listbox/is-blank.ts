/* @layer renderer-components @kind util */
const isBlank = (value: unknown): boolean =>
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

export { isBlank };
