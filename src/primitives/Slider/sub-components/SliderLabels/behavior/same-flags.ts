/* @layer renderer-components @kind util */
const sameFlags = (a: readonly boolean[] | null, b: readonly boolean[]): boolean =>
  a !== null && a.length === b.length && a.every((flag, index) => flag === b[index]);

export { sameFlags };
