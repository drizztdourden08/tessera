/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { matchesText } from '../../../data/text/matches-text';
import type { ItemListProps, ItemListRows } from '../ItemList.type';
import { groupItems } from './group-items';
import type { ItemListDeleteState } from './item-list-deletes.type';

const useItemListRows = <T,>(props: ItemListProps<T>, query: string, deletes: ItemListDeleteState, renamingId: string | null): ItemListRows<T> => {
  const { items, getId, getName, groupBy, groups: listed } = props;
  const { pending, done } = deletes;
  const live = useMemo(() => (done.length ? items.filter((item) => !done.includes(getId(item))) : items), [items, done, getId]);
  const shown = useMemo(
    () => (query ? live.filter((item) => pending.includes(getId(item)) || matchesText(getName(item), query)) : live),
    [live, pending, getId, getName, query],
  );
  const groups = useMemo(() => groupItems(shown, groupBy, listed, query === ''), [shown, groupBy, listed, query]);
  const order = useMemo(() => groups.flatMap((group) => group.items.map(getId)), [groups, getId]);
  const rowIds = useMemo(() => order.filter((id) => id !== renamingId && !pending.includes(id)), [order, renamingId, pending]);
  const held = pending.filter((id) => order.includes(id)).length;
  return { shown, groups, order, rowIds, shownCount: shown.length - held, total: live.length - pending.length };
};

export { useItemListRows };
