/* @layer renderer-components @kind logic */
const removedAt = <T>(list: readonly T[], index: number): readonly T[] =>
  list.filter((_held, at) => at !== index);

export { removedAt };
