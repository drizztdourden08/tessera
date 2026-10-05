/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { ListboxDrop } from '../../listbox/listbox-drop.type';
import type { ListboxField } from '../../listbox/listbox-field.type';

const useFreeDrop = <T>(free: boolean, loading: boolean, box: ListboxField<T, HTMLDivElement>): ListboxDrop<HTMLDivElement> => {
  const { drop } = box;
  const empty = free && !loading && box.model.rows.entries.length === 0;
  useEffect(() => {
    if (empty && drop.open) drop.close();
  }, [empty, drop.open]);
  return empty && drop.open ? { ...drop, open: false } : drop;
};

export { useFreeDrop };
