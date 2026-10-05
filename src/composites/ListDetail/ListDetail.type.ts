/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ItemListProps } from '../ItemList/ItemList.type';
import type { ListDetailLayoutProps } from '../ListDetailLayout/ListDetailLayout.type';

type ListDetailListProps<T> = Omit<ItemListProps<T>, 'selectedId' | 'onSelect' | 'onActivate'>;

type ListDetailGuardLook = 'dialog' | 'inline';

type ListDetailSave = () => boolean | void | Promise<boolean | void>;

type ListDetailMove = { kind: 'select'; id: string } | { kind: 'back' } | { kind: 'create' };

interface ListDetailProps<T> extends Omit<ListDetailLayoutProps, 'list' | 'detail' | 'onBack'> {
  list: ListDetailListProps<T>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  detail: ReactNode;
  dirty?: boolean;
  onSave?: ListDetailSave;
  onDiscard?: () => void;
  guard?: ListDetailGuardLook;
}

interface DirtyGuardOptions {
  dirty: boolean;
  onSave?: ListDetailSave;
  onDiscard?: () => void;
  perform: (move: ListDetailMove) => void;
}

interface DirtyGuard {
  pending: ListDetailMove | null;
  saving: boolean;
  request: (move: ListDetailMove) => void;
  stay: () => void;
  discard: () => void;
  save: (() => void) | undefined;
}

interface ListDetailGuardProps {
  open: boolean;
  message: string;
  saveLabel: string;
  saving: boolean;
  onStay: () => void;
  onDiscard: () => void;
  onSave?: () => void;
  stayRef: RefObject<HTMLButtonElement | null>;
}

interface ListDetailGuardActionsProps extends Omit<ListDetailGuardProps, 'open' | 'message'> {
  size?: 'sm' | 'md';
}

export type {
  DirtyGuard, DirtyGuardOptions, ListDetailGuardActionsProps, ListDetailGuardLook,
  ListDetailGuardProps, ListDetailListProps,
  ListDetailMove, ListDetailProps, ListDetailSave,
};
