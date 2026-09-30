/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { ListboxModel } from './listbox-state.type';

const useStartActive = <T>(open: boolean, model: ListboxModel<T>): void => {
  const filled = model.rows.entries.length > 0;
  const { active, query, states } = model;
  const lost = active.index === -1;

  useEffect(() => {
    if (!open) {
      if (!lost) active.activate(-1);
      return;
    }
    if (!filled || !lost) return;
    const selected = query === '' ? states.findIndex((state) => state.selected && !state.disabled) : -1;
    if (selected === -1) active.move('first');
    else active.activate(selected);
  }, [open, filled, lost]);

  useEffect(() => {
    if (open && filled && query !== '') active.move('first');
  }, [query]);
};

export { useStartActive };
