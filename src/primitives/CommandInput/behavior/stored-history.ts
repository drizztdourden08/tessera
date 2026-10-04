/* @layer renderer-components @kind logic */
const isCommandList = (stored: unknown): stored is string[] => Array.isArray(stored) && stored.every((entry) => typeof entry === 'string');

const readStoredHistory = (storageKey: string | undefined): readonly string[] => {
  if (storageKey === undefined || typeof localStorage === 'undefined') return [];
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return isCommandList(stored) ? stored : [];
  } catch {
    return [];
  }
};

export { readStoredHistory };
