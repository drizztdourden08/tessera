/* @layer renderer-components @kind logic */
const present = (values: readonly unknown[]): readonly unknown[] =>
  values.filter((v) => v !== undefined && v !== null);

export { present };
