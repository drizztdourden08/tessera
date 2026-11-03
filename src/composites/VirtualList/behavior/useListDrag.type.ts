/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ReorderDrag, ReorderModifier } from '../../reorder';
import type { ThresholdHandlers } from '../../reorder/threshold-handlers.type';
import type { VirtualAxis } from '../../virtual';
import type { ItemLayout } from './item-layout.type';

interface UseListDragInput {
  rootRef: RefObject<HTMLElement | null>;
  scrollerRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  layout: ItemLayout;
  axis: VirtualAxis;
  keysOf: (index: number) => readonly string[];
  onDrop: (moving: readonly string[], to: number, modifier: ReorderModifier) => void;
}

interface ListDrag {
  drag: ReorderDrag;
  target: number | null;
  modifier: ReorderModifier;
  handlersOf: (index: number) => ThresholdHandlers;
  swallowClick: () => boolean;
}

export type { ListDrag, UseListDragInput };
