/* @layer renderer-components @kind logic */
const toolbarInsertedAt = (ids: string[], id: string, index: number): string[] => {
  const at = Math.max(0, Math.min(Math.trunc(index), ids.length));
  return [...ids.slice(0, at), id, ...ids.slice(at)];
};

export { toolbarInsertedAt };
