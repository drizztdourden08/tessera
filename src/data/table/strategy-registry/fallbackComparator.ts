/* @layer renderer-components @kind logic */
import { isNullish } from './isNullish';
import type { Comparator } from './strategy-registry.type';

const fallbackComparator: Comparator = (a, b) => {
  if (isNullish(a) && isNullish(b)) return 0;
  if (isNullish(a)) return 1;
  if (isNullish(b)) return -1;
  const left = String(a);
  const right = String(b);
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
};

export { fallbackComparator };
