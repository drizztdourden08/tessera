/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { MarqueeItem } from '../../marquee';
import type { KeyTarget } from '../../virtual/virtual-focus.type';
import type { VirtualGridCellBind, VirtualGridReorder, VirtualGridSection, VirtualGridSelection } from '../VirtualGrid.type';
import type { GridHeights, GridLayout } from './grid-layout.type';
import type { GridReorder } from './useGridReorder.type';

interface UseGridInteractionInput<T> {
  flat: readonly T[];
  layout: GridLayout;
  heights: GridHeights;
  columns: number;
  sectionKeys: readonly string[];
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  tileWidth: RefObject<number>;
  getKey: (item: T, index: number) => string;
  sections?: readonly VirtualGridSection<T>[];
  selection?: VirtualGridSelection;
  getLabel?: (item: T, index: number) => string;
  holes?: (item: T, index: number) => boolean;
  reorder?: VirtualGridReorder<T>;
}

interface GridInteraction {
  jumpRef: RefObject<(stop: number, row: number) => void>;
  getRects: () => readonly MarqueeItem[];
  onMove: (event: KeyboardEvent<HTMLElement>, target: KeyTarget, from: number) => void;
  extrasOf: (item: number, key: string) => Partial<VirtualGridCellBind>;
  cellKeys: (event: KeyboardEvent<HTMLElement>, stop: number, item: number, navigate: (event: KeyboardEvent<HTMLElement>, stop: number) => void) => void;
  selecting: boolean;
  moving: GridReorder;
}

export type { GridInteraction, UseGridInteractionInput };
