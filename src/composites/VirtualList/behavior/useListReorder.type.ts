/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import type { DragGhostPoint } from '../../DragGhost';
import type { VirtualAxis } from '../../virtual';
import type { VirtualListCellBind, VirtualListReorder } from '../VirtualList.type';
import type { ItemLayout } from './item-layout.type';

interface UseListReorderInput<T> {
  reorder?: VirtualListReorder<T>;
  items: readonly T[];
  keys: readonly string[];
  indexOfKey: ReadonlyMap<string, number>;
  selected: ReadonlySet<string>;
  layout: ItemLayout;
  axis: VirtualAxis;
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  focusItem: (index: number) => void;
}

interface ListGhost {
  count: number;
  thumbnails: readonly ReactNode[];
  point: DragGhostPoint | null;
}

interface ListReorder {
  active: boolean;
  message: string;
  ghost: ListGhost | null;
  extrasOf: (index: number, key: string) => Partial<VirtualListCellBind>;
  keyMove: (event: KeyboardEvent<HTMLElement>, index: number) => boolean;
  swallowClick: () => boolean;
}

export type { ListGhost, ListReorder, UseListReorderInput };
