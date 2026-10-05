/* @layer renderer-components @kind util */
const writeStored = (key: string | undefined, value: unknown): boolean => {
  if (key === undefined) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export { writeStored };
