/* @layer renderer-components @kind util */
import type { ManagedListPick } from '../ManagedList.type';

const rowPick = (id: string, list: ManagedListPick): (() => void) | undefined => {
  const { onSelect, onActivate } = list;
  if (!onSelect && !onActivate) return undefined;
  return () => {
    onSelect?.(id);
    onActivate?.(id);
  };
};

export { rowPick };
