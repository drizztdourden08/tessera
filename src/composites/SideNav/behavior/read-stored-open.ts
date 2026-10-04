/* @layer renderer-components @kind logic */
const readStoredOpen = (storageKey: string | undefined): boolean | undefined => {
  if (storageKey === undefined) return undefined;
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    return typeof stored === 'boolean' ? stored : undefined;
  } catch {
    return undefined;
  }
};

export { readStoredOpen };
