/* @layer renderer-components @kind types */
import type { PointerEvent, ReactNode, Ref } from 'react';
import type { ActionItem } from '../../ActionBar';
import type { MarqueeItem } from '../../marquee';
import type { ReorderDrag } from '../../reorder';

interface DataTableHandle {
  getRects: () => readonly MarqueeItem[];
}

interface DataTableBind {
  onPointerDown?: (event: PointerEvent<HTMLElement>) => void;
}

interface RowMoveTarget {
  index: number;
  beforeKey?: string;
  afterKey?: string;
  groupKey?: string;
}

interface RowFeatureProps<T> {
  groupActions?: (groupKey: string, rows: readonly T[]) => readonly ActionItem[];
  onRowMove?: (fromKey: string, target: RowMoveTarget) => void;
  rowDragData?: (row: T) => Record<string, string>;
  scrollRef?: Ref<HTMLElement>;
  bind?: DataTableBind;
  overlay?: ReactNode;
  ref?: Ref<DataTableHandle>;
}

interface RowReorderBinding {
  total: number;
  indexOf: (id: string) => number;
  drag: ReorderDrag;
  handlers: (index: number) => ReturnType<ReorderDrag['handlers']>;
  step: (from: number, to: number) => void;
  message: string;
}

export type { DataTableBind, DataTableHandle, RowFeatureProps, RowMoveTarget, RowReorderBinding };
