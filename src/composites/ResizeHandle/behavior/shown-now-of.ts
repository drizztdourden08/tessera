/* @layer renderer-components @kind logic */
import type { ResizeOptions } from './resize-options.type';

const shownNowOf = (shown: number | undefined, options: ResizeOptions): number | undefined => {
  const folded = options.fold?.folded ?? null;
  if (folded === 'low') return 0;
  return folded === 'high' ? options.max : shown;
};

export { shownNowOf };
