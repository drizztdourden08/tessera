/* @layer renderer-components @kind logic */
import type { ItemListProps } from '../ItemList.type';
import type { ItemListRemoval } from './item-list-deletes.type';

const deleteOf = <T,>(list: ItemListProps<T>, removal: ItemListRemoval): ((id: string) => void) | undefined => {
  const { remove, confirmed } = removal;
  if (list.undoDelete === undefined) return list.onDelete && confirmed;
  return remove && ((id) => remove(id, 'button'));
};

export { deleteOf };
