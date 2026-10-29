/* @layer renderer-components @kind types */
import type { PointerEvent, RefObject } from 'react';
import type { ReorderDrag, ReorderModifier } from '../../reorder';
import type { VirtualGridSection } from '../VirtualGrid.type';
import type { GridHeights, GridLayout } from './grid-layout.type';
import type { GridTarget } from './grid-point-at.type';

interface UseGridDragInput<T> {
  sections?: readonly VirtualGridSection<T>[];
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  tileWidth: RefObject<number>;
  layout: GridLayout;
  heights: GridHeights;
  keys: readonly string[];
  sectionKeys: readonly string[];
  selected: ReadonlySet<string>;
  holeKeys: ReadonlySet<string>;
  onDrop: (moving: readonly string[], to: GridTarget, modifier: ReorderModifier) => void;
}

interface GridPointerHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

interface GridDrag {
  drag: ReorderDrag;
  target: GridTarget | null;
  keysOf: (index: number) => readonly string[];
  handlersOf: (item: number) => GridPointerHandlers;
  swallowClick: () => boolean;
}

export type { GridDrag, GridPointerHandlers, UseGridDragInput };
