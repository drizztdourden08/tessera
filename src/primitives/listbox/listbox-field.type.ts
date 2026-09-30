/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { FieldControl } from '../field-control/field-control.type';
import type { FieldState } from './field-state.type';
import type { ItemFilter } from './filter-items.type';
import type { ListboxFieldProps } from './listbox.type';
import type { ListboxDisplay, ListboxEntry, ListboxSetup } from './listbox-model.type';
import type { ListboxDrop } from './listbox-drop.type';
import type { ListboxModel } from './listbox-state.type';

interface UseListboxFieldParams<T, V> {
  setup: ListboxSetup<T, V>;
  look: ListboxFieldProps;
  query: string;
  filter: ItemFilter<T> | false;
  prefix: string;
  focusRef?: RefObject<HTMLElement | null>;
  onClose?: () => void;
}

interface ListboxField<T, E extends HTMLElement> {
  control: FieldControl;
  field: FieldState;
  drop: ListboxDrop<E>;
  model: ListboxModel<T>;
  displays: readonly ListboxDisplay<T>[];
  activeEntry: () => ListboxEntry<T> | undefined;
}

export type { ListboxField, UseListboxFieldParams };
