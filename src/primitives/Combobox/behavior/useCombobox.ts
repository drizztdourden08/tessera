/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useListboxField } from '../../listbox/useListboxField';
import { inputText } from './input-text';
import { queryFilter } from './query-filter';
import { showsFullValue } from './shows-full-value';
import { useComboboxKeys } from './useComboboxKeys';
import { useComboboxText } from './useComboboxText';
import { useFreeDrop } from './useFreeDrop';
import type { ItemFilter } from '../../listbox/filter-items.type';
import type { ListboxEntry, ListboxSetup } from '../../listbox/listbox-model.type';
import type { ComboboxLookProps } from '../Combobox.type';
import type { ComboboxState } from './useCombobox.type';

const useCombobox = <T, V>(setup: ListboxSetup<T, V>, look: ComboboxLookProps<T>, filter: ItemFilter<T> | false): ComboboxState<T> => {
  const multi = setup.max > 1;
  const free = look.freeText === true;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const words = useComboboxText(look, free);
  const box = useListboxField<T, V, HTMLDivElement>({
    setup, look, query: words.text ?? '', filter: queryFilter(filter, look.onQueryChange !== undefined && !free), prefix: 'combobox', focusRef: inputRef, onClose: words.revert, pickFirst: !free,
  });
  const { model, displays } = box;
  const drop = useFreeDrop(free, setup.loading, box);

  const pick = (entry: ListboxEntry<T>) => {
    model.pick(entry);
    if (multi) words.revert();
    else drop.close();
  };
  const commit = (next: readonly V[]) => {
    if (next.length >= setup.min) setup.commit(next);
    inputRef.current?.focus();
  };
  const removeAt = (index: number) => commit(setup.selected.filter((_, at) => at !== index));
  const inputValue = free ? words.text ?? '' : inputText(words.text, multi, displays);
  const keys = useComboboxKeys({
    drop, model, editing: !free && words.text !== null, free, emptyInput: multi && inputValue === '',
    pickActive: () => {
      const entry = box.activeEntry();
      if (entry) pick(entry);
      return entry !== undefined;
    },
    removeLast: () => removeAt(setup.selected.length - 1),
    revert: words.revert,
  });
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    look.onKeyDown?.(event, { open: drop.open, active: box.activeEntry()?.item });
    if (!event.defaultPrevented) keys(event);
  };

  return {
    ...box, drop, multi, free, min: setup.min, inputRef, inputValue, removeAt, onKeyDown,
    type: (next: string) => {
      words.set(next);
      drop.show();
    },
    clear: () => {
      words.revert();
      commit([]);
    },
    focusChange: setFocused,
    valueLook: setup,
    view: { model, columns: setup.columns, itemComponent: setup.itemComponent, multi, highlight: look.highlight !== false, onPick: pick },
    showValue: showsFullValue(setup, displays, focused || words.text !== null),
  };
};

export { useCombobox };
