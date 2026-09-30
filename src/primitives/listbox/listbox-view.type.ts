/* @layer renderer-components @kind types */
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import type { ItemContext, ListboxColumn, ListboxItemProps } from './listbox.type';
import type { EntryState, ListboxBlock, ListboxDisplay, ListboxEntry, ListboxSetup } from './listbox-model.type';
import type { ListboxDrop } from './listbox-drop.type';
import type { ListboxModel } from './listbox-state.type';

interface ListboxView<T> {
  model: ListboxModel<T>;
  columns: readonly ListboxColumn<T>[];
  itemComponent?: ComponentType<ListboxItemProps<T>>;
  renderItem?: (context: ItemContext<T>) => ReactNode;
  multi: boolean;
  highlight: boolean;
  onPick: (entry: ListboxEntry<T>) => void;
}

type GridStyle = CSSProperties & Record<'--listbox-columns', string>;

type DropStyle = CSSProperties & Partial<Record<'--listbox-attach' | '--listbox-space', string>>;

interface ListboxListProps<T> {
  view: ListboxView<T>;
  loading: boolean;
  emptyText: ReactNode;
  labelledBy?: string;
  label?: string;
}

interface ListboxGroupProps<T> {
  view: ListboxView<T>;
  block: ListboxBlock<T>;
  position: number;
}

interface ListboxOptionProps<T> {
  view: ListboxView<T>;
  entry: ListboxEntry<T>;
}

interface ListboxOptionBodyProps<T> {
  view: ListboxView<T>;
  context: ItemContext<T>;
}

interface ListboxCellsProps<T> {
  columns: readonly ListboxColumn<T>[];
  context: ItemContext<T>;
  highlight: boolean;
}

interface ListboxHeaderProps<T> {
  columns: readonly ListboxColumn<T>[];
}

interface ListboxMarkProps {
  multi: boolean;
  state: EntryState;
}

interface ListboxStatusProps {
  loading: boolean;
  empty: boolean;
  emptyText: ReactNode;
}

interface HighlightedTextProps {
  text: string;
  query: string;
}

interface ListboxDropViewProps {
  drop: ListboxDrop<HTMLElement>;
  invalid: boolean;
  size: 'md' | 'sm';
  className?: string;
  children: ReactNode;
}

interface ListboxPopupProps<T> extends ListboxListProps<T> {
  drop: ListboxDrop<HTMLElement>;
  invalid: boolean;
  size: 'md' | 'sm';
  header?: ReactNode;
}

type ValueLook<T> = Pick<
  ListboxSetup<T, unknown>,
  'columns' | 'itemComponent' | 'renderItem' | 'valueComponent' | 'valueDisplay' | 'categoryOf'
>;

interface ListboxValueProps<T> {
  displays: readonly ListboxDisplay<T>[];
  look: ValueLook<T>;
  placeholder: string;
  tags?: boolean;
}

interface ListboxCountProps<T> {
  displays: readonly ListboxDisplay<T>[];
}

interface ListboxValueRowProps<T> {
  item: T;
  look: ValueLook<T>;
}

export type {
  DropStyle,
  GridStyle,
  HighlightedTextProps,
  ListboxCellsProps,
  ListboxCountProps,
  ListboxDropViewProps,
  ListboxGroupProps,
  ListboxHeaderProps,
  ListboxListProps,
  ListboxMarkProps,
  ListboxOptionBodyProps,
  ListboxOptionProps,
  ListboxPopupProps,
  ListboxStatusProps,
  ListboxValueProps,
  ListboxValueRowProps,
  ListboxView,
  ValueLook,
};
