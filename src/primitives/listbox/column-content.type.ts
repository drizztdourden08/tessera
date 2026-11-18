/* @layer renderer-components @kind types */
import type { ValueFormats } from './format-value.type';
import type { ColumnRule, ItemContext, ListboxColumn } from './listbox.type';

interface ColumnContentInput<T> {
  column: ListboxColumn<T>;
  rule: ColumnRule<T> | undefined;
  value: unknown;
  context: ItemContext<T>;
  formats: ValueFormats;
}

export type { ColumnContentInput };
