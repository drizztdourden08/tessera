/* @layer renderer-components @kind logic */
const storeHistory = (storageKey: string | undefined, history: readonly string[]): boolean => {
  if (storageKey === undefined || typeof localStorage === 'undefined') return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
};

export { storeHistory };
