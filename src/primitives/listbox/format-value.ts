/* @layer renderer-components @kind util */
import { FORMATTERS } from './format-value.constants';
import type { ColumnFormat } from './listbox.type';

const formatValue = (value: unknown, format: ColumnFormat = 'text'): string => FORMATTERS[format](value);

export { formatValue };
