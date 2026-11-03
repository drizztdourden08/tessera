/* @layer renderer-components @kind logic */
const knownWidths = (keys: readonly string[], widths: ReadonlyMap<string, number>): number[] | null => {
  const found = keys.map((key) => widths.get(key));
  return found.every((width) => width !== undefined) ? found : null;
};

export { knownWidths };
