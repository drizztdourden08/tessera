/* @layer renderer-components @kind logic */
const readStoredWidth = (storageKey: string | undefined): number | undefined => {
  if (storageKey === undefined) return undefined;
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    return typeof stored === 'number' && Number.isFinite(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
};

export { readStoredWidth };
