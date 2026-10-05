/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { UnsavedSave } from '../../primitives/unsaved-guard/unsaved-guard.type';
import type { ItemListProps } from '../ItemList/ItemList.type';
import type { ListDetailLayoutProps } from '../ListDetailLayout/ListDetailLayout.type';

type ListDetailListProps<T> = Omit<ItemListProps<T>, 'selectedId' | 'onSelect' | 'onActivate'>;

type ListDetailGuardLook = 'dialog' | 'inline';

type ListDetailSave = UnsavedSave;

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
  ListDetailGuardActionsProps, ListDetailGuardLook,
  ListDetailGuardProps, ListDetailListProps,
  ListDetailMove, ListDetailProps, ListDetailSave,
};
