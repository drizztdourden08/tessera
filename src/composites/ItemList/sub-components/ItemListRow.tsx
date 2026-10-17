/* @layer renderer-components @kind component */
import type { ItemListRowProps } from '../ItemList.type';
import { ItemListLiveRow } from './ItemListLiveRow';
import { ItemListRemoved } from './ItemListRemoved';
import { ItemListRename } from './ItemListRename';
import { ItemListRenameInline } from './ItemListRenameInline';

const ItemListRow = <T,>({ list, view, item }: ItemListRowProps<T>) => {
  const { getId, getName, rowData, renameInline = false } = list;
  const id = getId(item);
  if (view.pending.includes(id)) return <ItemListRemoved list={list} view={view} item={item} />;
  if (id !== view.renamingId) return <ItemListLiveRow list={list} view={view} item={item} />;
  if (renameInline) return <ItemListRenameInline list={list} view={view} item={item} />;
  return <ItemListRename id={id} name={getName(item)} data={{ ...rowData?.(item), 'data-item-id': id }} onEnd={view.endRename} />;
};

export { ItemListRow };
