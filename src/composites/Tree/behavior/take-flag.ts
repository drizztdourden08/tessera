/* @layer renderer-components @kind logic */
const takeFlag = (flag: { current: boolean }): boolean => {
  const was = flag.current;
  flag.current = false;
  return was;
};

export { takeFlag };
