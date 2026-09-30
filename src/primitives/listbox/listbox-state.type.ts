/* @layer renderer-components @kind types */
import type { ItemFilter } from './filter-items.type';
import type { ItemContext } from './listbox.type';
import type { EntryState, ListboxEntry, ListboxRows, ListboxSetup } from './listbox-model.type';
import type { ActiveEntry } from './active-entry.type';

interface UseListboxParams<T, V> {
  setup: ListboxSetup<T, V>;
  query: string;
  filter: ItemFilter<T> | false;
  idBase: string;
}

interface ListboxModel<T> {
  rows: ListboxRows<T>;
  states: readonly EntryState[];
  active: ActiveEntry;
  count: number;
  query: string;
  listId: string;
  optionId: (index: number) => string;
  pick: (entry: ListboxEntry<T>) => void;
  contextFor: (entry: ListboxEntry<T>) => ItemContext<T>;
  labels: readonly string[];
}

export type { ListboxModel, UseListboxParams };
