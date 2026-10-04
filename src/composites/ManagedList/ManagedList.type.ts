/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import type { ListItemRowProps } from '../ListItemRow/ListItemRow.type';

type ManagedListRowParts = Pick<ListItemRowProps, 'meta' | 'icon' | 'columns'>;

type ManagedListFilter = boolean | 'auto';

type ManagedListCreate = (close: () => void) => ReactNode;

interface ManagedListProps<T> {
  title: string;
  items: readonly T[];
  getId: (item: T) => string;
  getName: (item: T) => string;
  render?: (item: T) => ManagedListRowParts;
  groupBy?: (item: T) => string | undefined;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onCreate?: () => void;
  create?: ManagedListCreate;
  createLabel?: string;
  onRename?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  filter?: ManagedListFilter;
  filterPlaceholder?: string;
  loading?: boolean;
  error?: ReactNode;
  empty?: ReactNode;
  emptyIcon?: ReactNode;
  className?: string;
}

interface ManagedListGroup<T> {
  name: string;
  items: readonly T[];
}

interface ManagedListView<T> {
  query: string;
  setQuery: (query: string) => void;
  shown: readonly T[];
  groups: readonly ManagedListGroup<T>[];
  rowIds: readonly string[];
  renamingId: string | null;
  startRename: (id: string) => void;
  endRename: (id: string, name: string | null) => void;
  listRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

interface ManagedListBodyProps<T> {
  list: ManagedListProps<T>;
  view: ManagedListView<T>;
}

interface ManagedListCreateView {
  open: boolean;
  onNew?: () => void;
  close: () => void;
  newRef: RefObject<HTMLButtonElement | null>;
  slotRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

interface ManagedListSettle {
  rowIds: readonly string[];
  openedWith: string | null;
  selectedId: string | null;
  list: HTMLElement | null;
  newButton: HTMLElement | null;
}

interface ManagedListHeadProps {
  title: string;
  shown: number;
  total: number;
  onNew?: () => void;
  newRef: RefObject<HTMLButtonElement | null>;
  creating: boolean;
  createLabel?: string;
}

interface ManagedListToolsProps {
  id: string;
  name: string;
  onStartRename?: (id: string) => void;
  onDelete?: (id: string) => void;
}

interface ManagedListRenameProps {
  id: string;
  name: string;
  onEnd: (id: string, name: string | null) => void;
}

export type {
  ManagedListBodyProps, ManagedListCreate, ManagedListCreateView, ManagedListFilter, ManagedListGroup, ManagedListHeadProps, ManagedListProps,
  ManagedListRenameProps, ManagedListRowParts, ManagedListSettle, ManagedListToolsProps, ManagedListView,
};
