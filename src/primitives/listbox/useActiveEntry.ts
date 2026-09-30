/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { navIndex } from './nav-index';
import type { ActiveEntry } from './active-entry.type';
import type { EntryState, ListboxEntry } from './listbox-model.type';

const useActiveEntry = <T>(entries: readonly ListboxEntry<T>[], states: readonly EntryState[]): ActiveEntry => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const index = activeKey === null ? -1 : entries.findIndex((entry) => entry.key === activeKey);
  const enabled = states.map((state) => !state.disabled);

  const activate = (at: number) => setActiveKey(entries[at]?.key ?? null);

  const move = (target: Parameters<ActiveEntry['move']>[0]) => {
    const next = navIndex(enabled, index, target);
    if (next !== -1) activate(next);
  };

  return { index, enabled, move, activate };
};

export { useActiveEntry };
