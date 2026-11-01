/* @layer renderer-components @kind logic */
const pruneHeights = (before: ReadonlyMap<string, number>, alive: ReadonlySet<string>): ReadonlyMap<string, number> => {
  const kept = [...before].filter(([key]) => alive.has(key));
  return kept.length === before.size ? before : new Map(kept);
};

export { pruneHeights };
