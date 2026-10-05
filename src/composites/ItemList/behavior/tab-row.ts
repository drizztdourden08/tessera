/* @layer renderer-components @kind logic */
const tabRow = (rowIds: readonly string[], focusedId: string | null, selectedId: string | null): string | null => {
  if (focusedId !== null && rowIds.includes(focusedId)) return focusedId;
  if (selectedId !== null && rowIds.includes(selectedId)) return selectedId;
  return rowIds[0] ?? null;
};

export { tabRow };
