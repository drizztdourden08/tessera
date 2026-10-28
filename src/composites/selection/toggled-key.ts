/* @layer renderer-components @kind logic */
const toggledId = (ids: ReadonlySet<string>, id: string): Set<string> => {
  const next = new Set(ids);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

export { toggledId };
