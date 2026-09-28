/* @layer renderer-components @kind logic */
import type { CollapsedSide } from '../SplitPane.type';

const startShareOf = (collapsed: CollapsedSide, ratio: number): number => {
  if (collapsed === 'start') return 0;
  if (collapsed === 'end') return 1;
  return ratio;
};

export { startShareOf };
