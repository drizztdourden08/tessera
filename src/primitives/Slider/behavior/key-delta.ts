/* @layer renderer-components @kind util */
const keyDelta = (key: string, step: number): number => {
  if (key === 'ArrowRight' || key === 'ArrowUp') return step;
  if (key === 'ArrowLeft' || key === 'ArrowDown') return -step;
  return 0;
};

export { keyDelta };
