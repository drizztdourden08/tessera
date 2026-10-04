/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Callout } from '../../../primitives/Callout';
import { EmptyState } from '../../../primitives/EmptyState';
import { Spinner } from '../../../primitives/Spinner';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ListItemList, ListItemRow } from '../../ListItemRow';
import type { ManagedListBodyProps } from '../ManagedList.type';
import { ManagedListRename } from './ManagedListRename';
import { ManagedListTools } from './ManagedListTools';

const ManagedListBody = <T,>({ list, view }: ManagedListBodyProps<T>) => {
  const { title, items, getId, getName, render, selectedId, onSelect, onRename, onDelete, loading, error, empty, emptyIcon } = list;
  const { lists } = useTesseraStrings();
  const tools = onRename !== undefined || onDelete !== undefined;
  if (loading) {
    return (
      <Box className="managed-list__loading" role="status">
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
        if (id === view.renamingId) return <ManagedListRename key={id} id={id} name={name} onEnd={view.endRename} />;
        const selected = id === selectedId;
        return (
          <ListItemRow
            key={id}
            name={name}
            {...render?.(item)}
            selected={selected}
            onClick={onSelect ? () => onSelect(id) : undefined}
            action={tools && (selected || !onSelect) ? <ManagedListTools id={id} name={name} onStartRename={onRename && view.startRename} onDelete={onDelete} /> : undefined}
            actionVisibility={selected ? 'always' : 'hover'}
          />
        );
      })}
    </ListItemList>
  ));
};

export { ManagedListBody };
