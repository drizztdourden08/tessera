/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ListItemRow } from '../../ListItemRow';
import type { ItemListRowProps } from '../ItemList.type';
import { ItemListUndo } from './ItemListUndo';

const ItemListRemoved = <T,>({ list, view, item }: ItemListRowProps<T>) => {
  const { getId, getName, render, rowData, undoDelete } = list;
  const { lists } = useTesseraStrings();
  const id = getId(item);
  const name = getName(item);
  const { removal } = view;
  return (
    <ListItemRow
      className="item-list__removed"
      name={name}
      {...render?.(item)}
      meta={lists.deleted}
      action={<ItemListUndo id={id} name={name} held={view.hoverId === id} undoFor={undoDelete} onUndo={removal.restore} onEnd={removal.commit} />}
      data={{ ...rowData?.(item), 'data-item-id': id }}
    />
  );
};

export { ItemListRemoved };
