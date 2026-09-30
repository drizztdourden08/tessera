/* @layer renderer-components @kind types */
import type { ListboxDrop } from '../../listbox/listbox-drop.type';
import type { ListboxModel } from '../../listbox/listbox-state.type';

interface SelectKeyParams<T> {
  drop: ListboxDrop<HTMLButtonElement>;
  model: ListboxModel<T>;
  searching: boolean;
  pickActive: () => void;
  clear: (() => void) | undefined;
  typeahead: (key: string, time: number) => number;
}

export type { SelectKeyParams };
