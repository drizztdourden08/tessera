/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { useListboxField } from '../../listbox/useListboxField';
import { inputText } from './input-text';
import { queryFilter } from './query-filter';
import { showsFullValue } from './shows-full-value';
import { useComboboxKeys } from './useComboboxKeys';
import type { ItemFilter } from '../../listbox/filter-items.type';
import type { ListboxEntry, ListboxSetup } from '../../listbox/listbox-model.type';
import type { ComboboxLookProps } from '../Combobox.type';
import type { ComboboxState } from './useCombobox.type';

const useCombobox = <T, V>(setup: ListboxSetup<T, V>, look: ComboboxLookProps, filter: ItemFilter<T> | false): ComboboxState<T> => {
  const multi = setup.max > 1;
  const [text, setText] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const emitQuery = (query: string) => look.onQueryChange?.(query);
  const revert = () => {
    if (text) emitQuery('');
    setText(null);
  };
  const box = useListboxField<T, V, HTMLDivElement>({
    setup, look, query: text ?? '', filter: queryFilter(filter, look.onQueryChange !== undefined), prefix: 'combobox', focusRef: inputRef, onClose: revert,
  });
  const { drop, model, displays } = box;

  const pick = (entry: ListboxEntry<T>) => {
    model.pick(entry);
    if (multi) revert();
    else drop.close();
  };
  const commit = (next: readonly V[]) => {
    if (next.length >= setup.min) setup.commit(next);
    inputRef.current?.focus();
  };
  const removeAt = (index: number) => commit(setup.selected.filter((_, at) => at !== index));
  const inputValue = inputText(text, multi, displays);
  const onKeyDown = useComboboxKeys({
    drop,
    model,
    editing: text !== null,
    emptyInput: multi && inputValue === '',
    pickActive: () => {
      const entry = box.activeEntry();
      if (entry) pick(entry);
    },
    removeLast: () => removeAt(setup.selected.length - 1),
    revert,
  });
  const type = (next: string) => {
    setText(next);
    emitQuery(next);
    drop.show();
  };
  const clear = () => {
    revert();
    commit([]);
  };

  return {
    ...box, multi, min: setup.min, inputRef, inputValue, type, removeAt, clear, onKeyDown, focusChange: setFocused, valueLook: setup,
    view: { model, columns: setup.columns, itemComponent: setup.itemComponent, multi, highlight: look.highlight !== false, onPick: pick },
    showValue: showsFullValue(setup, displays, focused || text !== null),
  };
};

export { useCombobox };
