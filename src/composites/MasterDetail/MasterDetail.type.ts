/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ManagedListProps } from '../ManagedList/ManagedList.type';
import type { MasterDetailLayoutProps } from '../MasterDetailLayout/MasterDetailLayout.type';

type MasterDetailList<T> = Omit<ManagedListProps<T>, 'selectedId' | 'onSelect' | 'onActivate'>;

type MasterDetailGuardLook = 'dialog' | 'inline';

type MasterDetailSave = () => boolean | void | Promise<boolean | void>;

type MasterDetailMove = { kind: 'select'; id: string } | { kind: 'back' } | { kind: 'create' };

type MasterDetailLayoutLook = Pick<
  MasterDetailLayoutProps,
  'resizable' | 'listWidth' | 'minListWidth' | 'maxListWidth' | 'storageKey' | 'backLabel' | 'listLabel' | 'detailLabel'
>;

interface MasterDetailProps<T> extends MasterDetailLayoutLook {
  list: MasterDetailList<T>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  detail: ReactNode;
  emptyDetail?: ReactNode;
  dirty?: boolean;
  onSave?: MasterDetailSave;
  onDiscard?: () => void;
  guard?: MasterDetailGuardLook;
  className?: string;
}

interface DirtyGuardOptions {
  dirty: boolean;
  onSave?: MasterDetailSave;
  onDiscard?: () => void;
  perform: (move: MasterDetailMove) => void;
}

interface DirtyGuard {
  pending: MasterDetailMove | null;
  saving: boolean;
  request: (move: MasterDetailMove) => void;
  stay: () => void;
  discard: () => void;
  save: (() => void) | undefined;
}

interface MasterDetailGuardProps {
  open: boolean;
  message: string;
  saveLabel: string;
  saving: boolean;
  onStay: () => void;
  onDiscard: () => void;
  onSave?: () => void;
  stayRef: RefObject<HTMLButtonElement | null>;
}

interface MasterDetailGuardActionsProps extends Omit<MasterDetailGuardProps, 'open' | 'message'> {
  size?: 'sm' | 'md';
}

export type {
  DirtyGuard, DirtyGuardOptions, MasterDetailGuardActionsProps, MasterDetailGuardLook,
  MasterDetailGuardProps, MasterDetailList,
  MasterDetailMove, MasterDetailProps, MasterDetailSave,
};
