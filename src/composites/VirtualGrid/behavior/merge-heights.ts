/* @layer renderer-components @kind logic */
const mergeHeights = (before: ReadonlyMap<string, number>, found: ReadonlyMap<string, number>): ReadonlyMap<string, number> => {
  const changed = [...found].filter(([key, height]) => before.get(key) !== height);
  if (changed.length === 0) return before;
  const next = new Map(before);
  changed.forEach(([key, height]) => next.set(key, height));
  return next;
};

export { mergeHeights };
