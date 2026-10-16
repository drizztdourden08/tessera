/* @layer renderer-components @kind data */
import { asDate } from '../date-format/as-date';
import { DATE_PRESETS } from '../date-format/date-format.constants';
import { formatDate } from '../date-format/format-date';
import { asNumber } from './as-number';
import { formatBytes } from './format-bytes';
import { valueText } from './value-text';
import type { DatePreset } from '../date-format/date-format.type';
import type { ColumnFormat } from './listbox.type';

const numberWith = (options: Intl.NumberFormatOptions) => (value: unknown): string =>
  asNumber(value)?.toLocaleString(undefined, options) ?? valueText(value);

const dateAs = (preset: DatePreset) => (value: unknown): string => {
  const at = asDate(value);
  return at ? formatDate(at, preset) : valueText(value);
};

const YES_NO: Readonly<Record<string, string>> = { true: 'Yes', false: 'No' };

const DATE_FORMATTERS = Object.fromEntries(DATE_PRESETS.map((preset) => [preset, dateAs(preset)])) as Record<DatePreset, (value: unknown) => string>;

const FORMATTERS: Readonly<Record<ColumnFormat, (value: unknown) => string>> = {
  text: valueText,
  number: numberWith({}),
  integer: numberWith({ maximumFractionDigits: 0 }),
  percent: numberWith({ style: 'percent', maximumFractionDigits: 1 }),
  bytes: (value) => {
    const bytes = asNumber(value);
    return bytes === undefined ? valueText(value) : formatBytes(bytes);
  },
  yesno: (value) => YES_NO[valueText(value)] ?? valueText(value),
  ...DATE_FORMATTERS,
};

export { FORMATTERS };
