/* @layer renderer-components @kind logic */
const stepIndex = (at: number, step: 1 | -1, count: number): number => {
  if (at >= 0) return (at + step + count) % count;
  return step > 0 ? 0 : count - 1;
};

export { stepIndex };
