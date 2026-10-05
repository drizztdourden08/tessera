/* @layer renderer-components @kind logic */
import { FILTER_FROM } from '../ItemList.constants';
import type { ItemListProps } from '../ItemList.type';

const showsFilter = <T,>(props: ItemListProps<T>): boolean => {
  const { items, filter = 'auto', loading, error } = props;
  if (loading || error || !items.length) return false;
  return filter === 'auto' ? items.length >= FILTER_FROM : filter;
};

export { showsFilter };
