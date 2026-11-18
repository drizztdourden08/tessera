/* @layer renderer-components @kind util */
import { DEFAULT_VALUE_FORMATS, FORMATTERS } from './format-value.constants';
import type { ValueFormats } from './format-value.type';
import type { ColumnFormat } from './listbox.type';

const formatValue = (value: unknown, format: ColumnFormat = 'text', formats: ValueFormats = DEFAULT_VALUE_FORMATS): string =>
  FORMATTERS[format](value, formats);

export { formatValue };
