/* @layer renderer-components @kind component */
import { ListItemRow } from '../../ListItemRow';
import { rowPick } from '../behavior/row-pick';
import { rowTabs } from '../behavior/row-tabs';
import type { ItemListRowProps } from '../ItemList.type';
import { ItemListRename } from './ItemListRename';
import { ItemListTools } from './ItemListTools';

const ItemListRow = <T,>({ list, view, item }: ItemListRowProps<T>) => {
  const { getId, getName, render, rowData, selectedId, onRename, onDelete, actionVisibility = 'hover' } = list;
  const id = getId(item);
  const name = getName(item);
  const data = { ...rowData?.(item), 'data-item-id': id };
  if (id === view.renamingId) return <ItemListRename id={id} name={name} data={data} onEnd={view.endRename} />;
  const selected = id === selectedId;
  const tabs = rowTabs(list, view.tabId, id);
  const tools = onRename !== undefined || onDelete !== undefined;
  return (
    <ListItemRow
      name={name}
      {...render?.(item)}
      selected={selected}
      tabIndex={tabs.row}
      onClick={rowPick(id, list)}
      action={tools ? <ItemListTools id={id} name={name} onStartRename={onRename && view.startRename} onDelete={onDelete} tabIndex={tabs.tools} /> : undefined}
      actionVisibility={selected ? 'always' : actionVisibility}
      data={data}
    />
  );
};

export { ItemListRow };
