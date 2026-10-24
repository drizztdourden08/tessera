/* @layer renderer-components @kind component */
import { useNameEdit } from '../../../primitives/field-control/useNameEdit';
import { ListItemRow } from '../../ListItemRow';
import { rowFacts } from '../behavior/row-facts';
import type { ItemListRowProps } from '../ItemList.type';
import '../../../theme/row-rename.css';
import { ItemListNameInput } from './ItemListNameInput';
import { ItemListTools } from './ItemListTools';

const ItemListRenameInline = <T,>({ list, view, item }: ItemListRowProps<T>) => {
  const { id, name, selected, visibility, data } = rowFacts(list, item);
  const actions = list.rowActions?.(item, { tabIndex: -1, selected });
  const edit = useNameEdit({
    name,
    onKeep: (next) => view.endRename(id, next === name ? null : next),
    onUndo: () => view.endRename(id, null),
  });
  return (
    <ListItemRow
      {...list.render?.(item)}
      className="row-rename"
      name={<ItemListNameInput edit={edit} size="sm" className="row-rename__input" />}
      selected={selected}
      action={actions == null ? undefined : <ItemListTools id={id} name={name} actions={actions} undoable={false} tabIndex={-1} />}
      actionVisibility={visibility}
      data={data}
    />
  );
};

export { ItemListRenameInline };
