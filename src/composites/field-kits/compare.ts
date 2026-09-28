/* @layer renderer-components @kind logic */
import { isNullish } from './coerce';
import type { Comparator } from '../../data/table/strategy-registry';

const nullsLast = (compare: Comparator): Comparator => (a, b) => {
  if (isNullish(a) && isNullish(b)) return 0;
  if (isNullish(a)) return 1;
  if (isNullish(b)) return -1;
  return compare(a, b);
};

export { nullsLast };
