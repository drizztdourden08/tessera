/* @layer renderer-components @kind component */
import { ListItemRow } from '../../ListItemRow';
import { deleteOf } from '../behavior/delete-of';
import { hasTools } from '../behavior/has-tools';
import { rowFacts } from '../behavior/row-facts';
import { renameStart } from '../behavior/rename-start';
import { rowPick } from '../behavior/row-pick';
import { rowTabs } from '../behavior/row-tabs';
import type { ItemListRowProps } from '../ItemList.type';
import { ItemListRenamePen } from './ItemListRenamePen';
import { ItemListTools } from './ItemListTools';

const ItemListLiveRow = <T,>({ list, view, item }: ItemListRowProps<T>) => {
  const { id, name, selected, visibility, data } = rowFacts(list, item);
  const tabs = rowTabs(list, view.tabId, id);
  const actions = list.rowActions?.(item, { tabIndex: tabs.tools, selected });
  const rename = renameStart(list, view.startRename);
  return (
    <ListItemRow
      name={name}
      {...list.render?.(item)}
      selected={selected}
      tabIndex={tabs.row}
      onClick={rowPick(id, list)}
      nameAction={rename.pen && <ItemListRenamePen id={id} name={name} tabIndex={tabs.tools} onStartRename={rename.pen} />}
      action={hasTools(list, actions) ? (
        <ItemListTools
          id={id}
          name={name}
          actions={actions}
          onStartRename={rename.button}
          onDelete={deleteOf(list, view.removal)}
          onKeep={view.removal.kept}
          undoable={list.undoDelete !== undefined}
          tabIndex={tabs.tools}
        />
      ) : undefined}
      actionVisibility={visibility}
      data={data}
    />
  );
};

export { ItemListLiveRow };
