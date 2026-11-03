/* @layer renderer-components @kind logic */
const listMarkOf = (item: number, gap: number, total: number): 'before' | 'after' | undefined => {
  if (item === gap) return 'before';
  return gap === total && item === total - 1 ? 'after' : undefined;
};

export { listMarkOf };
