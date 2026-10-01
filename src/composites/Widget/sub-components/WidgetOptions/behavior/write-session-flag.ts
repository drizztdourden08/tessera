/* @layer renderer-components @kind logic */
const writeSessionFlag = (key: string, on: boolean): boolean => {
  try {
    window.sessionStorage.setItem(key, on ? '1' : '0');
    return true;
  } catch {
    return false;
  }
};

export { writeSessionFlag };
