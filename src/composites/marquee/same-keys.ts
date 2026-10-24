/* @layer renderer-components @kind logic */
const sameKeys = (a: readonly string[], b: readonly string[]): boolean =>
  a.length === b.length && a.every((key, at) => key === b[at]);

export { sameKeys };
