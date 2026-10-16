/* @layer renderer-components @kind util */
import { RELATIVE_STYLES, RELATIVE_UNITS } from './date-format.constants';
import { intlFormats } from './intl-formats';
import type { DateContext } from './date-format.type';

const capital = (text: string, locale: string | undefined): string => text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);

const relativeText = ({ at, now, length, strings }: DateContext): string => {
  const seconds = Math.trunc((at.getTime() - now) / 1000);
  const unit = RELATIVE_UNITS.find(([, size]) => Math.abs(seconds) >= size);
  if (!unit) return strings.justNow;
  const [name, size] = unit;
  const words = intlFormats.relative(strings.locale, RELATIVE_STYLES[length]).format(Math.trunc(seconds / size), name);
  return capital(words, strings.locale);
};

export { relativeText };
