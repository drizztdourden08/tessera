/* @layer stories @kind logic */
import { RELATIVE_UNITS } from '../relative-time.constants';
import type { RelativeTimeStrings, RelativeTimeFormat, RelativeTimeText } from '../RelativeTime.type';

const capital = (text: string, locale: string | undefined): string => text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);

const relativeTimeText = (value: Date | number, now: number, format: RelativeTimeFormat, strings: RelativeTimeStrings): RelativeTimeText => {
  const { locale, justNow, full } = strings;
  const at = new Date(value);
  const seconds = (at.getTime() - now) / 1000;
  const unit = RELATIVE_UNITS.find(([, size]) => Math.abs(seconds) >= size);
  const words = unit
    ? new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: format }).format(Math.round(seconds / unit[1]), unit[0])
    : justNow;
  return { text: capital(words, locale), full: at.toLocaleString(locale, full), iso: at.toISOString() };
};

export { relativeTimeText };
