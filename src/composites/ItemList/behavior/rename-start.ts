/* @layer renderer-components @kind logic */
import type { ItemListProps, ItemListRenameStart } from '../ItemList.type';

const renameStart = <T,>(list: ItemListProps<T>, start: (id: string) => void): ItemListRenameStart => {
  if (!list.onRename) return {};
  return list.renameInline ? { pen: start } : { button: start };
};

export { renameStart };
