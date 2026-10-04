/* @layer renderer-components @kind logic */
import type { ManagedListPick, ManagedListRowTabs } from '../ManagedList.type';

const rowTabs = (list: ManagedListPick, tabId: string | null, id: string): ManagedListRowTabs => {
  const { selectedId, onSelect, onActivate } = list;
  if (onActivate) return id === tabId ? { row: 0, tools: undefined } : { row: -1, tools: -1 };
  return { row: undefined, tools: !onSelect || id === selectedId ? undefined : -1 };
};

export { rowTabs };
