/* @layer renderer-components @kind logic */
const cleanToolbarIds = (raw: unknown, known: ReadonlySet<string>, seen: Set<string>, cap: number): string[] => {
  const ids: string[] = [];
  if (!Array.isArray(raw)) return ids;
  for (const id of raw) {
    if (ids.length >= cap) break;
    if (typeof id !== 'string' || !known.has(id) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
};

export { cleanToolbarIds };
