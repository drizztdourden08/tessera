/* @layer renderer-components @kind logic */
import type { GridMarkInput } from './grid-mark-of.type';

const gridMarkOf = (input: GridMarkInput): 'before' | 'after' | undefined => {
  const { item, gap, section, total, owners } = input;
  if (section !== undefined && gap < total && owners[gap] !== section) return item === gap - 1 ? 'after' : undefined;
  if (item === gap) return 'before';
  return gap === total && item === total - 1 ? 'after' : undefined;
};

export { gridMarkOf };
