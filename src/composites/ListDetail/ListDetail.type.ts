/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { UnsavedGuard, UnsavedSave } from '../../primitives/unsaved-guard/unsaved-guard.type';
import type { ItemListProps } from '../ItemList/ItemList.type';
import type { ListDetailLayoutProps } from '../ListDetailLayout/ListDetailLayout.type';

type ListDetailListProps<T> = Omit<ItemListProps<T>, 'selectedId' | 'onSelect'>;

type ListDetailGuardLook = 'dialog' | 'inline';

type ListDetailSave = UnsavedSave;

type ListDetailMove =
  | { kind: 'select'; id: string; activate?: boolean }
  | { kind: 'back' }
  | { kind: 'create' }
  | { kind: 'run'; run: () => void };

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

interface ListDetailGuardView<T> {
  guard: UnsavedGuard<ListDetailMove>;
  items: ItemListProps<T>;
  back: () => void;
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
  ListDetailGuardProps, ListDetailGuardView, ListDetailListProps,
  ListDetailMove, ListDetailProps, ListDetailSave,
};
