/* @layer renderer-components @kind logic */
import type { ResizeOptions } from './resize-options.type';

const startValueOf = (options: ResizeOptions): number => {
  const folded = options.fold?.folded ?? null;
  if (folded === 'low') return 0;
  if (folded === 'high') return options.max;
  return options.measure?.() ?? options.value ?? options.min;
};

export { startValueOf };
