/* @layer renderer-components @kind util */
import type { ItemListPick } from '../ItemList.type';

const rowPick = (id: string, list: ItemListPick): (() => void) | undefined => {
  const { onSelect, onActivate } = list;
  if (!onSelect && !onActivate) return undefined;
  return () => {
    onSelect?.(id);
    onActivate?.(id);
  };
};

export { rowPick };
