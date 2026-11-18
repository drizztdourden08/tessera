/* @layer renderer-components @kind util */
import { FORMATTERS } from './format-value.constants';
import type { ValueFormats } from './format-value.type';
import type { ColumnFormat } from './listbox.type';

const formatValue = (value: unknown, formats: ValueFormats, format: ColumnFormat = 'text'): string => FORMATTERS[format](value, formats);

export { formatValue };
