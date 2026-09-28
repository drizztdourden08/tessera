/* @layer renderer-components @kind logic */
const replacedAt = <T>(list: readonly T[], index: number, next: T): readonly T[] =>
  list.map((held, at) => (at === index ? next : held));

export { replacedAt };
