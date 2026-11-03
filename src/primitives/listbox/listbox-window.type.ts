/* @layer renderer-components @kind types */
import type { CSSProperties, RefObject } from 'react';
import type { RowRange } from '../../data/row-window';
import type { ListboxBlock, ListboxEntry } from './listbox-model.type';
import type { ListboxView } from './listbox-view.type';

interface ListboxWindow {
  rowSize: number;
  ranges: readonly RowRange[];
}

interface UseListboxWindowParams<T> {
  enabled: boolean;
  scrollerRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLElement | null>;
  blocks: readonly ListboxBlock<T>[];
  activeIndex: number;
  query: string;
}

interface WindowReadInput {
  scroller: HTMLElement;
  list: HTMLElement;
  before: ListboxWindow;
}

interface BlockRangeInput {
  below: number;
  viewport: number;
  rowSize: number;
  count: number;
}

interface ListboxSlot<T> {
  at: number;
  rows: number;
  entry: ListboxEntry<T> | undefined;
}

interface ListboxEntriesProps<T> {
  view: ListboxView<T>;
  block: ListboxBlock<T>;
  range: RowRange | undefined;
}

interface ListboxGapProps {
  rows: number;
  count?: number;
}

interface ListboxSizerProps<T> {
  view: ListboxView<T>;
}

type GapStyle = CSSProperties & Record<'--listbox-gap-rows', string>;

export type {
  BlockRangeInput,
  GapStyle,
  ListboxEntriesProps,
  ListboxGapProps,
  ListboxSizerProps,
  ListboxSlot,
  ListboxWindow,
  UseListboxWindowParams,
  WindowReadInput,
};
