/* @layer renderer-components @kind util */
import type { ItemListGroup } from '../../ItemList/ItemList.type';
import type { ListDetailMove } from '../ListDetail.type';

const guardGroups = (groups: readonly ItemListGroup[] | undefined, request: (move: ListDetailMove) => void): readonly ItemListGroup[] | undefined =>
  groups?.map((group) => {
    const { action } = group;
    if (!action) return group;
    return { ...group, action: { ...action, onSelect: () => request({ kind: 'run', run: action.onSelect }) } };
  });

export { guardGroups };
