/* @layer renderer-components @kind logic */
const nextPath = (path: readonly string[], column: number, picked: ReadonlySet<string>): readonly string[] => {
  const head = path.slice(0, column);
  const only = picked.size === 1 ? picked.values().next().value : undefined;
  return only === undefined ? head : [...head, only];
};

export { nextPath };
