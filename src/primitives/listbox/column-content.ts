/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { formatValue } from './format-value';
import { valueText } from './value-text';
import type { ColumnRule, ItemContext, ListboxColumn } from './listbox.type';

const mappedContent = <T>(column: ListboxColumn<T>, value: unknown, context: ItemContext<T>): ReactNode => {
  const { map } = column;
  if (map === undefined) return undefined;
  return typeof map === 'function' ? map(value, context) : map[valueText(value)];
};

const columnContent = <T>(
  column: ListboxColumn<T>,
  rule: ColumnRule<T> | undefined,
  value: unknown,
  context: ItemContext<T>,
): ReactNode => {
  if (rule?.show !== undefined) return rule.show;
  if (column.render) return column.render(value, context);
  const mapped = mappedContent(column, value, context);
  if (mapped !== undefined && mapped !== null) return mapped;
  return typeof column.format === 'function' ? column.format(value, context) : formatValue(value, column.format);
};

export { columnContent };
