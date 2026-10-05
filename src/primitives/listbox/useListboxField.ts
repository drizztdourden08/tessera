/* @layer renderer-components @kind hook */
import { useId } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { fieldState } from './field-state';
import { useActiveScroll } from './useActiveScroll';
import { useListbox } from './useListbox';
import { useListboxDrop } from './useListboxDrop';
import { useSelectedDisplays } from './useSelectedDisplays';
import { useStartActive } from './useStartActive';
import type { ListboxField, UseListboxFieldParams } from './listbox-field.type';

const useListboxField = <T, V, E extends HTMLElement>(params: UseListboxFieldParams<T, V>): ListboxField<T, E> => {
  const { setup, look, query, filter, prefix, focusRef, onClose, pickFirst } = params;
  const control = useFieldControl(look.id, look['aria-describedby']);
  const field = fieldState(look, control);
  const idBase = useId();
  const drop = useListboxDrop<E>({
    disabled: field.disabled,
    defaultOpen: look.defaultOpen,
    inline: look.inline,
    contentKey: `${setup.items.length}:${query}`,
    focusRef,
    onClose,
  });
  const model = useListbox({ setup, query, filter, idBase: `${prefix}${idBase}` });
  const displays = useSelectedDisplays(setup);
  useStartActive(drop.open, model, pickFirst);
  useActiveScroll(drop.dropRef, model.active.index);

  const activeEntry = () => {
    const entry = model.rows.entries[model.active.index];
    return entry && model.active.enabled[entry.index] ? entry : undefined;
  };

  return { control, field, drop, model, displays, activeEntry };
};

export { useListboxField };
