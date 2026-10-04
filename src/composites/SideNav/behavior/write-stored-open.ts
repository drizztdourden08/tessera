/* @layer renderer-components @kind logic */
const writeStoredOpen = (storageKey: string | undefined, open: boolean): boolean => {
  if (storageKey === undefined) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(open));
    return true;
  } catch {
    return false;
  }
};

export { writeStoredOpen };
