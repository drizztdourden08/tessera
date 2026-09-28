/* @layer renderer-components @kind logic */
import type { CollapsedSide } from '../SplitPane.type';

const hiddenLabelOf = (collapsed: CollapsedSide, startLabel: string, endLabel: string): string | null => {
  if (collapsed === 'none') return null;
  return collapsed === 'start' ? startLabel : endLabel;
};

export { hiddenLabelOf };
