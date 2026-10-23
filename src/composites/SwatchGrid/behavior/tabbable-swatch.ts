/* @layer renderer-components @kind util */
const tabbableSwatch = (ids: readonly string[], focusedId: string | null, selectedId: string | undefined): string | undefined => {
  const live = [focusedId, selectedId].find((id) => id != null && ids.includes(id));
  return live ?? ids[0];
};

export { tabbableSwatch };
