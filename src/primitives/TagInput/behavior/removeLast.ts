/* @layer renderer-components @kind logic */
const removeLast = (value: readonly string[]): readonly string[] =>
  value.length === 0 ? value : value.slice(0, -1);

export { removeLast };
