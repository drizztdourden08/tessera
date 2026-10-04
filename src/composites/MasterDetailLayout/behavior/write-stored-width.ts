/* @layer renderer-components @kind logic */
const writeStoredWidth = (storageKey: string | undefined, width: number): boolean => {
  if (storageKey === undefined) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(width));
    return true;
  } catch {
    return false;
  }
};

export { writeStoredWidth };
