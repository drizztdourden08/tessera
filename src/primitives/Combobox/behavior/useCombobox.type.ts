/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { ListboxView, ValueLook } from '../../listbox/listbox-view.type';
import type { ListboxDrop } from '../../listbox/listbox-drop.type';
import type { ListboxField } from '../../listbox/listbox-field.type';
import type { ListboxModel } from '../../listbox/listbox-state.type';

interface ComboboxState<T> extends ListboxField<T, HTMLDivElement> {
  view: ListboxView<T>;
  valueLook: ValueLook<T>;
  multi: boolean;
  min: number;
  inputRef: RefObject<HTMLInputElement | null>;
  inputValue: string;
  showValue: boolean;
  type: (text: string) => void;
  focusChange: (focused: boolean) => void;
  removeAt: (index: number) => void;
  clear: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

interface ComboboxKeyParams<T> {
  drop: ListboxDrop<HTMLDivElement>;
  model: ListboxModel<T>;
  editing: boolean;
  emptyInput: boolean;
  pickActive: () => void;
  removeLast: () => void;
  revert: () => void;
}

export type { ComboboxKeyParams, ComboboxState };
