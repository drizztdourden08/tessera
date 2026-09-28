/* @layer renderer-components @kind logic */
const removeAt = (value: readonly string[], index: number): readonly string[] =>
  index < 0 || index >= value.length ? value : value.filter((_, i) => i !== index);

export { removeAt };
