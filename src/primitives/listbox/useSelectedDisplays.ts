/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { valueText } from './value-text';
import type { ListboxDisplay, ListboxSetup } from './listbox-model.type';

const useSelectedDisplays = <T, V>(setup: ListboxSetup<T, V>): ListboxDisplay<T>[] => {
  const memory = useRef(new Map<string, T>());
  const selectedIds = new Set(setup.selected.map(setup.identityOfValue));
  for (const item of setup.items) {
    const identity = setup.identityOfItem(item);
    if (selectedIds.has(identity)) memory.current.set(identity, item);
  }
  return setup.selected.map((value) => {
    const key = setup.identityOfValue(value);
    const item = memory.current.get(key) ?? setup.itemOfValue(value);
    const label = item === undefined ? valueText(value) : setup.labelOf(item);
    return { key, item, label, tag: item === undefined ? label : setup.tagOf(item) };
  });
};

export { useSelectedDisplays };
