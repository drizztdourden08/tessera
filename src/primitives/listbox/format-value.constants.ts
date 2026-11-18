/* @layer renderer-components @kind data */
import { asDate } from '../date-format/as-date';
import { DATE_PRESETS } from '../date-format/date-format.constants';
import { formatDate } from '../date-format/format-date';
import { asNumber } from './as-number';
import { formatBytes } from './format-bytes';
import { valueText } from './value-text';
import type { DatePreset } from '../date-format/date-format.type';
import type { ValueFormatter } from './format-value.type';
import type { ColumnFormat } from './listbox.type';

const numberWith = (options: Intl.NumberFormatOptions): ValueFormatter => (value, { locale }) =>
  asNumber(value)?.toLocaleString(locale, options) ?? valueText(value, locale);

const dateAs = (preset: DatePreset): ValueFormatter => (value, { locale }) => {
  const at = asDate(value);
  return at ? formatDate(at, preset, { locale }) : valueText(value, locale);
};

const DATE_FORMATTERS = Object.fromEntries(DATE_PRESETS.map((preset) => [preset, dateAs(preset)])) as Record<DatePreset, ValueFormatter>;

const FORMATTERS: Readonly<Record<ColumnFormat, ValueFormatter>> = {
  text: (value, { locale }) => valueText(value, locale),
  number: numberWith({}),
  integer: numberWith({ maximumFractionDigits: 0 }),
  percent: numberWith({ style: 'percent', maximumFractionDigits: 1 }),
  bytes: (value, { locale }) => {
    const bytes = asNumber(value);
    return bytes === undefined ? valueText(value, locale) : formatBytes(bytes, locale);
  },
  yesno: (value, { locale, yes, no }) => {
    const text = valueText(value, locale);
    if (text === 'true') return yes;
    return text === 'false' ? no : text;
  },
  ...DATE_FORMATTERS,
};

export { FORMATTERS };
