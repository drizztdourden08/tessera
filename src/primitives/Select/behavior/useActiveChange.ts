/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { ListboxModel } from '../../listbox/listbox-state.type';
import type { ActiveReport } from './active-report.type';

const useActiveChange = <T, V>(model: ListboxModel<T>, valueOf: (item: T) => V, onActiveChange: ActiveReport<V> | undefined): void => {
  const entry = model.rows.entries[model.active.index];
  const key = entry?.key ?? null;
  const latest = useRef({ entry, valueOf, onActiveChange });
  const told = useRef<string | null>(null);

  useEffect(() => {
    latest.current = { entry, valueOf, onActiveChange };
  });

  useEffect(() => {
    if (key === told.current) return;
    told.current = key;
    const now = latest.current;
    now.onActiveChange?.(now.entry === undefined ? null : now.valueOf(now.entry.item));
  }, [key]);
};

export { useActiveChange };
