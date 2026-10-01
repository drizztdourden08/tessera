/* @layer renderer-components @kind logic */
const readSessionFlag = (key: string): boolean => {
  try {
    return window.sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
};

export { readSessionFlag };
