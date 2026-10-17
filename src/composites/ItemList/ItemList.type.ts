/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';
import type { ItemListRemoval } from './behavior/item-list-deletes.type';
import type { ActionData } from '../../primitives/action-data';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { NameEdit } from '../../primitives/field-control/name-edit.type';
import type { OptionDisabled } from '../../primitives/field-control/option-disabled.type';
import type { ListItemRowActionVisibility, ListItemRowProps } from '../ListItemRow/ListItemRow.type';

type ItemListRowParts = Pick<ListItemRowProps, 'meta' | 'icon' | 'media' | 'mediaAspect' | 'mediaWidth' | 'columns'>;

type ItemListFilter = boolean | 'auto';

type ItemListCreate = (close: () => void) => ReactNode;

type ItemListGroupAction = Pick<ActionData, 'label' | 'onSelect' | 'disabled'>;

interface ItemListRowState {
  tabIndex?: number;
  selected: boolean;
}

type ItemListRowActions<T> = (item: T, row: ItemListRowState) => ReactNode;

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
  newDisabled?: OptionDisabled;
  onRename?: (id: string, name: string) => void;
  renameInline?: boolean;
  onDelete?: (id: string) => void;
  undoDelete?: number;
  deleteKey?: boolean;
  rowActions?: ItemListRowActions<T>;
  actionVisibility?: ListItemRowActionVisibility;
  filter?: ItemListFilter;
  filterPlaceholder?: string;
  loading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  empty?: ReactNode;
  emptyIcon?: ReactNode;
  className?: string;
}

interface ItemListGroupRows<T> extends ItemListGroup {
  items: readonly T[];
}

interface ItemListRows<T> {
  shown: readonly T[];
  shownCount: number;
  total: number;
  groups: readonly ItemListGroupRows<T>[];
  order: readonly string[];
  rowIds: readonly string[];
}

interface ItemListView<T> extends ItemListRows<T> {
  query: string;
  setQuery: (query: string) => void;
  pending: readonly string[];
  hoverId: string | null;
  removal: ItemListRemoval;
  onMouseOver: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
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
  remove?: (id: string) => void;
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
  newDisabled?: OptionDisabled;
}

interface ItemListToolsProps {
  id: string;
  name: string;
  actions?: ReactNode;
  onStartRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onKeep?: (id: string) => void;
  undoable: boolean;
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

interface ItemListRenameStart {
  pen?: (id: string) => void;
  button?: (id: string) => void;
}

interface ItemListRenamePenProps {
  id: string;
  name: string;
  tabIndex?: number;
  onStartRename: (id: string) => void;
}

interface ItemListNameInputProps {
  edit: NameEdit;
  className: string;
  size?: ControlSize;
}

export type {
  ItemListBodyProps, ItemListCreate, ItemListCreateView, ItemListFilter, ItemListGroup, ItemListGroupAction, ItemListGroupRows,
  ItemListHeadProps, ItemListKey, ItemListNameInputProps, ItemListPick, ItemListProps, ItemListRenamePenProps, ItemListRenameProps, ItemListRenameStart, ItemListRowActions, ItemListRowParts,
  ItemListRowProps, ItemListRows, ItemListRowState, ItemListRowTabs, ItemListSettle, ItemListToolsProps, ItemListView,
};
