/* @layer renderer-components @kind util */
import { matchesText } from '../../data/text/matches-text';
import { searchText } from './search-text';
import type { ItemFilter } from './filter-items.type';
import type { ListboxSetup } from './listbox-model.type';

const filterItems = <T, V>(setup: ListboxSetup<T, V>, query: string, filter: ItemFilter<T> | false): readonly T[] => {
  if (query.trim() === '' || filter === false) return setup.items;
  if (filter) return setup.items.filter((item) => filter(item, query));
  return setup.items.filter((item) => matchesText(searchText(item, setup), query));
};

export { filterItems };
