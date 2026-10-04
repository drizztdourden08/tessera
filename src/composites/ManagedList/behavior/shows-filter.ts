/* @layer renderer-components @kind logic */
import { FILTER_FROM } from '../ManagedList.constants';
import type { ManagedListProps } from '../ManagedList.type';

const showsFilter = <T,>(props: ManagedListProps<T>): boolean => {
  const { items, filter = 'auto', loading, error } = props;
  if (loading || error || !items.length) return false;
  return filter === 'auto' ? items.length >= FILTER_FROM : filter;
};

export { showsFilter };
