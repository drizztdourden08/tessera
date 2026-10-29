/* @layer renderer-components @kind logic */
const firstSelectedAt = (selected: ReadonlySet<string> | undefined, indexOfKey: ReadonlyMap<string, number>): number | undefined => {
  if (!selected) return undefined;
  for (const key of selected) {
    const at = indexOfKey.get(key);
    if (at !== undefined) return at;
  }
  return undefined;
};

export { firstSelectedAt };
