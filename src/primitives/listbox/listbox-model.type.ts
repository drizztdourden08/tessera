/* @layer renderer-components @kind types */
import type { ComponentType, ReactNode } from 'react';
import type { ValueBinding } from './value-binding.type';
import type {
  ItemContext, ListboxCategories, ListboxColumn, ListboxItemProps, ListboxTone, ValueDisplay,
} from './listbox.type';

interface ListboxSetup<T, V> extends ValueBinding<T, V> {
  items: readonly T[];
  columns: readonly ListboxColumn<T>[];
  keyOf: (item: T) => string;
  labelOf: (item: T) => string;
  disabledOf: (item: T) => boolean;
  categoryOf: (item: T) => string | undefined;
  categories: ListboxCategories;
  min: number;
  max: number;
  itemComponent?: ComponentType<ListboxItemProps<T>>;
  renderItem?: (context: ItemContext<T>) => ReactNode;
  valueComponent?: ComponentType<ListboxItemProps<T>>;
  valueDisplay: ValueDisplay;
  tagOf: (item: T) => ReactNode;
  loading: boolean;
  emptyText: ReactNode;
}

interface ListboxEntry<T> {
  item: T;
  key: string;
  identity: string;
  index: number;
  category: string | undefined;
  label: string;
  itemDisabled: boolean;
}

interface ListboxBlock<T> {
  key: string;
  category: string | undefined;
  label: ReactNode;
  icon: ReactNode;
  entries: ListboxEntry<T>[];
}

interface ListboxRows<T> {
  blocks: ListboxBlock<T>[];
  entries: ListboxEntry<T>[];
}

interface EntryState {
  selected: boolean;
  disabled: boolean;
  locked: boolean;
}

interface ListboxCell {
  content: ReactNode;
  text: string;
  tone: ListboxTone | undefined;
}

interface ListboxDisplay<T> {
  key: string;
  label: string;
  tag: ReactNode;
  item: T | undefined;
}

interface SelectionLimits {
  min: number;
  max: number;
}

type NavTarget = 'first' | 'last' | number;

export type {
  EntryState,
  ListboxBlock,
  ListboxCell,
  ListboxDisplay,
  ListboxEntry,
  ListboxRows,
  ListboxSetup,
  NavTarget,
  SelectionLimits,
};
