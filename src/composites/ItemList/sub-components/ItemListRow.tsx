/* @layer renderer-components @kind component */
import { ListItemRow } from '../../ListItemRow';
import { deleteOf } from '../behavior/delete-of';
import { hasTools } from '../behavior/has-tools';
import { rowPick } from '../behavior/row-pick';
import { rowTabs } from '../behavior/row-tabs';
import type { ItemListRowProps } from '../ItemList.type';
import { ItemListRemoved } from './ItemListRemoved';
import { ItemListRename } from './ItemListRename';
import { ItemListTools } from './ItemListTools';

const ItemListRow = <T,>({ list, view, item }: ItemListRowProps<T>) => {
  const { getId, getName, render, rowData, selectedId, onRename, rowActions, actionVisibility = 'hover' } = list;
  const id = getId(item);
  const name = getName(item);
  const data = { ...rowData?.(item), 'data-item-id': id };
  if (view.pending.includes(id)) return <ItemListRemoved list={list} view={view} item={item} />;
  if (id === view.renamingId) return <ItemListRename id={id} name={name} data={data} onEnd={view.endRename} />;
  const selected = id === selectedId;
  const tabs = rowTabs(list, view.tabId, id);
  const actions = rowActions?.(item, { tabIndex: tabs.tools, selected });
  return (
    <ListItemRow
      name={name}
      {...render?.(item)}
      selected={selected}
      tabIndex={tabs.row}
      onClick={rowPick(id, list)}
      action={hasTools(list, actions) ? (
        <ItemListTools
          id={id}
          name={name}
          actions={actions}
          onStartRename={onRename && view.startRename}
          onDelete={deleteOf(list, view.removal)}
          onKeep={view.removal.kept}
          undoable={list.undoDelete !== undefined}
          tabIndex={tabs.tools}
        />
      ) : undefined}
      actionVisibility={selected ? 'always' : actionVisibility}
      data={data}
    />
  );
};

export { ItemListRow };
