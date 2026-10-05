/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';
import type { ListItemRowActionVisibility, ListItemRowProps } from '../ListItemRow/ListItemRow.type';

type ItemListRowParts = Pick<ListItemRowProps, 'meta' | 'icon' | 'columns'>;

type ItemListFilter = boolean | 'auto';

type ItemListCreate = (close: () => void) => ReactNode;

interface ItemListProps<T> {
  title: string;
  items: readonly T[];
  getId: (item: T) => string;
  getName: (item: T) => string;
  render?: (item: T) => ItemListRowParts;
  groupBy?: (item: T) => string | undefined;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCreate?: () => void;
  create?: ItemListCreate;
  createOpen?: boolean;
  onCreateOpenChange?: (open: boolean) => void;
  createLabel?: string;
  onRename?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  actionVisibility?: ListItemRowActionVisibility;
  filter?: ItemListFilter;
  filterPlaceholder?: string;
  loading?: boolean;
  error?: ReactNode;
  empty?: ReactNode;
  emptyIcon?: ReactNode;
  className?: string;
}

interface ItemListGroup<T> {
  name: string;
  items: readonly T[];
}

interface ItemListView<T> {
  query: string;
  setQuery: (query: string) => void;
  shown: readonly T[];
  groups: readonly ItemListGroup<T>[];
  rowIds: readonly string[];
  renamingId: string | null;
  tabId: string | null;
  startRename: (id: string) => void;
  endRename: (id: string, name: string | null) => void;
  listRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
}

type ItemListPick = Pick<ItemListProps<unknown>, 'selectedId' | 'onSelect' | 'onActivate'>;

interface ItemListKey extends Pick<ItemListPick, 'onSelect' | 'onActivate'> {
  event: Pick<KeyboardEvent<HTMLElement>, 'key' | 'target' | 'preventDefault'>;
  buttons: readonly HTMLElement[];
  rowIds: readonly string[];
  rename?: (id: string) => void;
}

interface ItemListRowTabs {
  row: number | undefined;
  tools: number | undefined;
}

interface ItemListBodyProps<T> {
  list: ItemListProps<T>;
  view: ItemListView<T>;
}

interface ItemListCreateView {
  open: boolean;
  onNew?: () => void;
  close: () => void;
  newRef: RefObject<HTMLButtonElement | null>;
  slotRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

interface ItemListSettle {
  rowIds: readonly string[];
  openedWith: string | null;
  selectedId: string | null;
  list: HTMLElement | null;
  newButton: HTMLElement | null;
}

interface ItemListHeadProps {
  title: string;
  shown: number;
  total: number;
  onNew?: () => void;
  newRef: RefObject<HTMLButtonElement | null>;
  creating: boolean;
  createLabel?: string;
}

interface ItemListToolsProps {
  id: string;
  name: string;
  onStartRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  tabIndex?: number;
}

interface ItemListRenameProps {
  id: string;
  name: string;
  onEnd: (id: string, name: string | null) => void;
}

export type {
  ItemListBodyProps, ItemListCreate, ItemListCreateView, ItemListFilter, ItemListGroup, ItemListHeadProps, ItemListKey,
  ItemListPick, ItemListProps, ItemListRenameProps, ItemListRowParts, ItemListRowTabs, ItemListSettle, ItemListToolsProps,
  ItemListView,
};
