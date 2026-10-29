/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import type { DragGhostPoint } from '../../DragGhost';
import type { VirtualGridCellBind, VirtualGridReorder, VirtualGridSection } from '../VirtualGrid.type';
import type { GridHeights, GridLayout } from './grid-layout.type';

interface UseGridReorderInput<T> {
  reorder?: VirtualGridReorder<T>;
  sections?: readonly VirtualGridSection<T>[];
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  tileWidth: RefObject<number>;
  layout: GridLayout;
  heights: GridHeights;
  flat: readonly T[];
  keys: readonly string[];
  sectionKeys: readonly string[];
  columns: number;
  selected: ReadonlySet<string>;
  holeKeys: ReadonlySet<string>;
  indexOfKey: ReadonlyMap<string, number>;
  focusItem: (index: number) => void;
}

interface GridGhost {
  count: number;
  thumbnails: readonly ReactNode[];
  point: DragGhostPoint | null;
}

interface GridReorder {
  active: boolean;
  message: string;
  announce: (message: string) => void;
  into: string | null;
  ghost: GridGhost | null;
  extrasOf: (item: number, key: string) => Partial<VirtualGridCellBind>;
  keyMove: (event: KeyboardEvent<HTMLElement>, item: number) => boolean;
  swallowClick: () => boolean;
}

export type { GridGhost, GridReorder, UseGridReorderInput };
