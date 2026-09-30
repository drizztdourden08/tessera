/* @layer renderer-components @kind hook */
import { buildRows } from './build-rows';
import { entryState } from './entry-state';
import { filterItems } from './filter-items';
import { nextValues } from './next-values';
import { useActiveEntry } from './useActiveEntry';
import type { ListboxEntry } from './listbox-model.type';
import type { ListboxModel, UseListboxParams } from './listbox-state.type';

const useListbox = <T, V>(params: UseListboxParams<T, V>): ListboxModel<T> => {
  const { setup, query, filter, idBase } = params;
  const rows = buildRows(filterItems(setup, query, filter), setup);
  const selectedIds = new Set(setup.selected.map(setup.identityOfValue));
  const count = selectedIds.size;
  const states = rows.entries.map((entry) => entryState(entry, selectedIds, count, setup));
  const active = useActiveEntry(rows.entries, states);

  const pick = (entry: ListboxEntry<T>) => {
    const next = nextValues(setup.selected, setup.valueOf(entry.item), setup.identityOfValue, setup);
    if (next !== null) setup.commit(next);
  };

  const contextFor = (entry: ListboxEntry<T>) => {
    const state = states[entry.index];
    return {
      item: entry.item,
      index: entry.index,
      selected: state?.selected ?? false,
      active: entry.index === active.index,
      disabled: state?.disabled ?? false,
      category: entry.category,
      query,
      place: 'list' as const,
    };
  };

  return {
    rows,
    states,
    active,
    count,
    query,
    listId: `${idBase}-list`,
    optionId: (index) => `${idBase}-option-${index}`,
    pick,
    contextFor,
    labels: rows.entries.map((entry) => entry.label),
  };
};

export { useListbox };
