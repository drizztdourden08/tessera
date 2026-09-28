/* @layer renderer-components @kind logic */
const toPair = (value: unknown, fallback: unknown): readonly [unknown, unknown] => {
  if (!Array.isArray(value)) return [fallback, fallback];
  const list: readonly unknown[] = value;
  return [list[0], list[1]];
};

export { toPair };
