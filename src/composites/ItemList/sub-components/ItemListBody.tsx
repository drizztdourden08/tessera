/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Callout } from '../../../primitives/Callout';
import { EmptyState } from '../../../primitives/EmptyState';
import { Spinner } from '../../../primitives/Spinner';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ListItemList, ListItemRow } from '../../ListItemRow';
import { rowPick } from '../behavior/row-pick';
import { rowTabs } from '../behavior/row-tabs';
import type { ItemListBodyProps } from '../ItemList.type';
import { ItemListRename } from './ItemListRename';
import { ItemListTools } from './ItemListTools';

const ItemListBody = <T,>({ list, view }: ItemListBodyProps<T>) => {
  const { title, items, getId, getName, render, selectedId, onRename, onDelete, actionVisibility = 'hover', loading, error, empty, emptyIcon } = list;
  const { lists } = useTesseraStrings();
  const tools = onRename !== undefined || onDelete !== undefined;
  if (loading) {
    return (
      <Box className="item-list__loading" role="status">
        <Spinner size="sm" />
        <Text variant="caption">{lists.loadingOf(title)}</Text>
      </Box>
    );
  }
  if (error) return <Box role="alert"><Callout tone="danger">{error}</Callout></Box>;
  if (!items.length) return <EmptyState size="sm" icon={emptyIcon} message={empty ?? lists.empty} />;
  if (!view.shown.length) return <EmptyState size="sm" message={lists.noMatch(view.query)} />;
  return view.groups.map((group) => (
    <ListItemList key={group.name} heading={group.name || undefined} label={group.name ? undefined : title}>
      {group.items.map((item) => {
        const id = getId(item);
        const name = getName(item);
        if (id === view.renamingId) return <ItemListRename key={id} id={id} name={name} onEnd={view.endRename} />;
        const selected = id === selectedId;
        const tabs = rowTabs(list, view.tabId, id);
        return (
          <ListItemRow
            key={id}
            name={name}
            {...render?.(item)}
            selected={selected}
            tabIndex={tabs.row}
            onClick={rowPick(id, list)}
            action={tools ? <ItemListTools id={id} name={name} onStartRename={onRename && view.startRename} onDelete={onDelete} tabIndex={tabs.tools} /> : undefined}
            actionVisibility={selected ? 'always' : actionVisibility}
          />
        );
      })}
    </ListItemList>
  ));
};

export { ItemListBody };
