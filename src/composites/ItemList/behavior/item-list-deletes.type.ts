/* @layer renderer-components @kind types */
import type { MouseEvent } from 'react';

type ItemListDeleteFrom = 'key' | 'button';

interface ItemListDeleteState {
  pending: readonly string[];
  done: readonly string[];
}

interface ItemListDeletes extends ItemListDeleteState {
  hoverId: string | null;
  start: (id: string) => void;
  restore: (id: string) => void;
  commit: (id: string) => void;
  onMouseOver: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

interface ItemListRowOrder {
  order: readonly string[];
  rowIds: readonly string[];
}

interface ItemListRemoval {
  remove?: (id: string, from: ItemListDeleteFrom) => void;
  restore: (id: string) => void;
  commit: (id: string) => void;
  restoreLatest: () => boolean;
  confirmed: (id: string) => void;
  kept: (id: string) => void;
}

interface ItemListUndoProps {
  id: string;
  name: string;
  held: boolean;
  undoFor?: number;
  onUndo: (id: string) => void;
  onEnd: (id: string) => void;
}

export type { ItemListDeleteFrom, ItemListDeletes, ItemListDeleteState, ItemListRemoval, ItemListRowOrder, ItemListUndoProps };
