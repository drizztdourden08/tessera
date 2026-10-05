/* @layer renderer-components @kind util */
const readStored = <T>(key: string | undefined, accept: (stored: unknown) => T | undefined): T | undefined => {
  if (key === undefined) return undefined;
  try {
    return accept(JSON.parse(localStorage.getItem(key) ?? 'null'));
  } catch {
    return undefined;
  }
};

export { readStored };
