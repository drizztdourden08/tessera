/* @layer renderer-components @kind types */
import type { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';
import type { ListboxView } from '../../listbox/listbox-view.type';
import type { ListboxField } from '../../listbox/listbox-field.type';

interface SelectState<T> extends ListboxField<T, HTMLButtonElement> {
  view: ListboxView<T>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchRef: RefObject<HTMLInputElement | null>;
  onKeyDown: (event: KeyboardEvent) => void;
}

export type { SelectState };
