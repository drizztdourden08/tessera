/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';
import type { ActionData } from '../../primitives/action-data';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { ListItemRowActionVisibility, ListItemRowProps } from '../ListItemRow/ListItemRow.type';

type ItemListRowParts = Pick<ListItemRowProps, 'meta' | 'icon' | 'columns'>;

type ItemListFilter = boolean | 'auto';

type ItemListCreate = (close: () => void) => ReactNode;

type ItemListGroupAction = Pick<ActionData, 'label' | 'onSelect' | 'disabled'>;

interface ItemListGroup {
  name: string;
  empty?: ReactNode;
  action?: ItemListGroupAction;
}

interface ItemListProps<T> {
  title: string;
  items: readonly T[];
  getId: (item: T) => string;
  getName: (item: T) => string;
  render?: (item: T) => ItemListRowParts;
  groupBy?: (item: T) => string | undefined;
  groups?: readonly ItemListGroup[];
  rowData?: (item: T) => DataAttributes;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCreate?: () => void;
  create?: ItemListCreate;
  createOpen?: boolean;
  onCreateOpenChange?: (open: boolean) => void;
  createLabel?: string;
  createTour?: string;
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

interface ItemListGroupRows<T> extends ItemListGroup {
  items: readonly T[];
}

interface ItemListView<T> {
  query: string;
  setQuery: (query: string) => void;
  shown: readonly T[];
  groups: readonly ItemListGroupRows<T>[];
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
  createTour: string;
}

interface ItemListToolsProps {
  id: string;
  name: string;
  onStartRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  tabIndex?: number;
}

interface ItemListRowProps<T> extends ItemListBodyProps<T> {
  item: T;
}

interface ItemListRenameProps {
  id: string;
  name: string;
  data: DataAttributes;
  onEnd: (id: string, name: string | null) => void;
}

export type {
  ItemListBodyProps, ItemListCreate, ItemListCreateView, ItemListFilter, ItemListGroup, ItemListGroupAction, ItemListGroupRows,
  ItemListHeadProps, ItemListKey, ItemListPick, ItemListProps, ItemListRenameProps, ItemListRowParts, ItemListRowProps,
  ItemListRowTabs, ItemListSettle, ItemListToolsProps, ItemListView,
};
