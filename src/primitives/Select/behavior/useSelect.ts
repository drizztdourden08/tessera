/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { useListboxField } from '../../listbox/useListboxField';
import { useActiveChange } from './useActiveChange';
import { useFocusOnOpen } from './useFocusOnOpen';
import { useSelectKeys } from './useSelectKeys';
import type { ListboxEntry, ListboxSetup } from '../../listbox/listbox-model.type';
import type { SelectLookProps } from '../Select.type';
import type { ActiveReport } from './active-report.type';
import type { SelectState } from './useSelect.type';

const useSelect = <T, V>(setup: ListboxSetup<T, V>, look: SelectLookProps, onActiveChange?: ActiveReport<V>): SelectState<T> => {
  const searchable = look.searchable === true;
  const multi = setup.max > 1;
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const box = useListboxField<T, V, HTMLButtonElement>({
    setup, look, query: searchable ? search : '', filter: undefined, prefix: 'select', onClose: () => setSearch(''),
  });
  const { drop, model } = box;

  const pick = (entry: ListboxEntry<T>) => {
    model.pick(entry);
    if (!multi) drop.close();
  };
  const clearable = setup.min === 0 && !multi && setup.selected.length > 0;
  const onKeyDown = useSelectKeys({
    drop,
    model,
    searching: searchable,
    pickActive: () => {
      const entry = box.activeEntry();
      if (entry) pick(entry);
    },
    clear: clearable ? () => setup.commit([]) : undefined,
  });
  useFocusOnOpen(drop.open && searchable, searchRef);
  useActiveChange(model, setup.valueOf, onActiveChange);

  const view = { model, columns: setup.columns, itemComponent: setup.itemComponent, renderItem: setup.renderItem, multi, highlight: searchable, onPick: pick };
  return { ...box, view, search, setSearch, searchRef, onKeyDown };
};

export { useSelect };
