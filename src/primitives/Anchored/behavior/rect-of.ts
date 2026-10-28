/* @layer renderer-components @kind util */
import type { AnchoredRect, AnchoredRectSource } from '../Anchored.type';

const rectOf = (source: AnchoredRectSource | undefined): AnchoredRect | null => {
  if (source === undefined) return null;
  return typeof source === 'function' ? source() : source;
};

export { rectOf };
