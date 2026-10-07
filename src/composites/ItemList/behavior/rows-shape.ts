/* @layer renderer-components @kind logic */
import type { ListItemShape } from '../../ListItemRow/ListItemRow.type';
import type { ItemListProps } from '../ItemList.type';

const rowsShape = <T,>(list: ItemListProps<T>, items: readonly T[]): ListItemShape => {
  const { render, onRename, onDelete, actionVisibility = 'hover' } = list;
  const parts = items.map((item) => render?.(item));
  return {
    icon: parts.some((part) => part?.icon != null),
    columns: Math.max(0, ...parts.map((part) => part?.columns?.length ?? 0)),
    action: actionVisibility === 'always' && (onRename !== undefined || onDelete !== undefined),
  };
};

export { rowsShape };
