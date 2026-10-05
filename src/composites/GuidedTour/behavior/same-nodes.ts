/* @layer renderer-components @kind logic */
const sameNodes = (a: readonly HTMLElement[], b: readonly HTMLElement[]): boolean =>
  a.length === b.length && a.every((node, at) => node === b[at]);

export { sameNodes };
