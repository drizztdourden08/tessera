/* @layer renderer-components @kind util */
import { DATE_STRINGS } from '../strings/dates-strings.constants';
import { asDate } from './as-date';
import { DEFAULT_LENGTHS } from './date-format.constants';
import { PRESET_TEXT } from './format-date.constants';
import { intlFormats } from './intl-formats';
import type { DateFormat, DateFormatOptions, DateValue } from './date-format.type';

const formatDate = (value: DateValue, format: DateFormat = 'datetime', options: DateFormatOptions = {}): string => {
  const at = asDate(value);
  if (!at) return '';
  const strings = { ...DATE_STRINGS, ...options.strings, ...(options.locale === undefined ? {} : { locale: options.locale }) };
  if (typeof format !== 'string') return intlFormats.date(strings.locale, format).format(at);
  const length = options.length ?? DEFAULT_LENGTHS[format];
  return PRESET_TEXT[format]({ at, now: options.now ?? Date.now(), length, strings, label: options.label });
};

export { formatDate };
