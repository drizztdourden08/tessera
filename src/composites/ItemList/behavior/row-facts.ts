/* @layer renderer-components @kind logic */
import type { ItemListProps } from '../ItemList.type';

const rowFacts = <T,>(list: ItemListProps<T>, item: T) => {
  const id = list.getId(item);
  const selected = id === list.selectedId;
  return {
    id,
    name: list.getName(item),
    selected,
    visibility: selected ? ('always' as const) : (list.actionVisibility ?? 'hover'),
    data: { ...list.rowData?.(item), 'data-item-id': id },
  };
};

export { rowFacts };
