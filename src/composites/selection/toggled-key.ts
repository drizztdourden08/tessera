/* @layer renderer-components @kind logic */
const toggledKey = (keys: ReadonlySet<string>, key: string): Set<string> => {
  const next = new Set(keys);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
};

export { toggledKey };
