/* @layer renderer-components @kind data */
import { asDate } from './as-date';
import { asNumber } from './as-number';
import { formatBytes } from './format-bytes';
import { valueText } from './value-text';
import type { ColumnFormat } from './listbox.type';

const numberWith = (options: Intl.NumberFormatOptions) => (value: unknown): string =>
  asNumber(value)?.toLocaleString(undefined, options) ?? valueText(value);

const dateWith = (options: Intl.DateTimeFormatOptions) => (value: unknown): string =>
  asDate(value)?.toLocaleString(undefined, options) ?? valueText(value);

const YES_NO: Readonly<Record<string, string>> = { true: 'Yes', false: 'No' };

const FORMATTERS: Readonly<Record<ColumnFormat, (value: unknown) => string>> = {
  text: valueText,
  number: numberWith({}),
  integer: numberWith({ maximumFractionDigits: 0 }),
  percent: numberWith({ style: 'percent', maximumFractionDigits: 1 }),
  bytes: (value) => {
    const bytes = asNumber(value);
    return bytes === undefined ? valueText(value) : formatBytes(bytes);
  },
  date: dateWith({ dateStyle: 'medium' }),
  datetime: dateWith({ dateStyle: 'medium', timeStyle: 'short' }),
  yesno: (value) => YES_NO[valueText(value)] ?? valueText(value),
};

export { FORMATTERS };
