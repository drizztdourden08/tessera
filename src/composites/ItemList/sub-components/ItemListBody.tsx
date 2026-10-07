/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Callout } from '../../../primitives/Callout';
import { EmptyState } from '../../../primitives/EmptyState';
import { Spinner } from '../../../primitives/Spinner';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ListItemList } from '../../ListItemRow';
import { rowsShape } from '../behavior/rows-shape';
import type { ItemListBodyProps } from '../ItemList.type';
import { ItemListEmptyGroup } from './ItemListEmptyGroup';
import { ItemListRow } from './ItemListRow';

const ItemListBody = <T,>({ list, view }: ItemListBodyProps<T>) => {
  const { title, items, getId, loading, error, empty, emptyIcon } = list;
  const { lists } = useTesseraStrings();
  if (loading) {
    return (
      <Box className="item-list__loading" role="status">
        <Spinner size="sm" />
        <Text variant="caption">{lists.loadingOf(title)}</Text>
      </Box>
    );
  }
  if (error) return <Box role="alert"><Callout tone="danger">{error}</Callout></Box>;
  if (!view.groups.length) {
    return items.length ? <EmptyState size="sm" message={lists.noMatch(view.query)} /> : <EmptyState size="sm" icon={emptyIcon} message={empty ?? lists.empty} />;
  }
  return view.groups.map((group) => (group.items.length ? (
    <ListItemList key={group.name} heading={group.name || undefined} label={group.name ? undefined : title} shape={rowsShape(list, group.items)}>
      {group.items.map((item) => <ItemListRow key={getId(item)} list={list} view={view} item={item} />)}
    </ListItemList>
  ) : <ItemListEmptyGroup key={group.name} name={group.name} empty={group.empty} action={group.action} />));
};

export { ItemListBody };
