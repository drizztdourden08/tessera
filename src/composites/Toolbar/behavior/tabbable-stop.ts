/* @layer renderer-components @kind util */
const tabbableStop = (ids: readonly string[], focused: string | null): string | undefined =>
  ids.find((id) => id === focused) ?? ids[0];

export { tabbableStop };
