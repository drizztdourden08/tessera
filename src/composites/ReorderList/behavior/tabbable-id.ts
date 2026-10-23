/* @layer renderer-components @kind util */
import type { ReorderItem } from '../ReorderList.type';

const tabbableId = (items: readonly ReorderItem[], focusedId: string | null, selectedId: string | undefined): string | undefined => {
  const known = (id: string | null | undefined): id is string => id != null && items.some((item) => item.id === id);
  if (known(focusedId)) return focusedId;
  return known(selectedId) ? selectedId : items[0]?.id;
};

export { tabbableId };
