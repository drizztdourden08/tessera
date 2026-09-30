/* @layer renderer-components @kind util */
import type { ItemFilter } from '../../listbox/filter-items.type';

const queryFilter = <T>(filter: ItemFilter<T> | false, remote: boolean): ItemFilter<T> | false => {
  if (filter !== undefined) return filter;
  return remote ? false : undefined;
};

export { queryFilter };
