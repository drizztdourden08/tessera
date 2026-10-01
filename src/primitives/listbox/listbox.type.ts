/* @layer renderer-components @kind types */
import type { ComponentType, ReactNode } from 'react';
import type { TextTone } from '../TextElement/TextElement.type';
import type { ControlSize } from '../field-control/field-control.type';

type FieldOf<T> = T extends object ? Extract<keyof T, string> : never;

type ValueOf<T, F> = [F] extends [never] ? T : F extends keyof T ? T[F] : never;

type ItemField<T> = FieldOf<T> | (string & Record<never, never>);

type ItemAccessor<T, R> = ItemField<T> | ((item: T) => R);

type ListboxTone = TextTone;

type ColumnAlign = 'start' | 'center' | 'end';

type ColumnWidth = 'auto' | 'fill' | 'xs' | 'sm' | 'md' | 'lg';

type ColumnFormat = 'text' | 'number' | 'integer' | 'percent' | 'bytes' | 'date' | 'datetime' | 'yesno';

type ItemPlace = 'list' | 'trigger';

type ValueDisplay = 'label' | 'full';

interface ItemContext<T> {
  item: T;
  index: number;
  selected: boolean;
  active: boolean;
  disabled: boolean;
  category: string | undefined;
  query: string;
  place: ItemPlace;
}

type ColumnEvaluator<T, R> = (value: unknown, context: ItemContext<T>) => R;

interface ColumnCondition<T> {
  field?: ItemField<T>;
  equals?: unknown;
  in?: readonly unknown[];
  not?: unknown;
  empty?: boolean;
  above?: number;
  below?: number;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
}

interface ColumnRule<T> {
  when: ColumnCondition<T> | ColumnEvaluator<T, boolean>;
  show?: ReactNode;
  tone?: ListboxTone;
}

interface ListboxColumn<T> {
  field?: ItemAccessor<T, unknown>;
  id?: string;
  header?: ReactNode;
  width?: ColumnWidth;
  align?: ColumnAlign;
  format?: ColumnFormat | ColumnEvaluator<T, ReactNode>;
  map?: Readonly<Record<string, ReactNode>> | ColumnEvaluator<T, ReactNode>;
  tone?: ListboxTone | Readonly<Record<string, ListboxTone>> | ColumnEvaluator<T, ListboxTone | undefined>;
  rules?: readonly ColumnRule<T>[];
  render?: ColumnEvaluator<T, ReactNode>;
  empty?: ReactNode;
  inTrigger?: boolean;
  searchable?: boolean;
}

interface ListboxCategory {
  label?: ReactNode;
  icon?: ReactNode;
}

type ListboxCategories = Readonly<Record<string, ListboxCategory>>;

type ListboxItemProps<T> = ItemContext<T>;

interface ListboxLook<T> {
  columns?: readonly ListboxColumn<T>[];
  getKey?: ItemAccessor<T, string | number>;
  getLabel?: ItemAccessor<T, string>;
  isItemDisabled?: ItemAccessor<T, boolean>;
  groupBy?: ItemAccessor<T, string | undefined>;
  categories?: ListboxCategories;
  itemComponent?: ComponentType<ListboxItemProps<T>>;
  valueComponent?: ComponentType<ListboxItemProps<T>>;
  valueDisplay?: ValueDisplay;
  tagField?: ItemAccessor<T, ReactNode>;
}

interface ListboxFieldProps {
  loading?: boolean;
  emptyText?: ReactNode;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  defaultOpen?: boolean;
  inline?: boolean;
  size?: ControlSize;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

interface ListboxValueProps<T, F extends FieldOf<T>> {
  items: readonly T[];
  valueField?: F;
  value?: ValueOf<T, F> | null;
  onChange?: (value: ValueOf<T, F> | null) => void;
  values?: readonly ValueOf<T, F>[];
  onValuesChange?: (values: ValueOf<T, F>[]) => void;
}

export type {
  ColumnAlign,
  ColumnCondition,
  ColumnEvaluator,
  ColumnFormat,
  ColumnRule,
  ColumnWidth,
  FieldOf,
  ItemAccessor,
  ItemContext,
  ItemPlace,
  ListboxCategories,
  ListboxCategory,
  ListboxColumn,
  ListboxFieldProps,
  ListboxItemProps,
  ListboxLook,
  ListboxTone,
  ListboxValueProps,
  ValueDisplay,
  ValueOf,
};
