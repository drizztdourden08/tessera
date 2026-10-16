/* @layer renderer-components @kind util */
import { CALENDAR_TIME, CALENDAR_WEEK_DAYS, DAY_MS, INTL_PRESETS } from './date-format.constants';
import { intlFormats } from './intl-formats';
import type { DateContext, DateStrings } from './date-format.type';

const dayStart = (time: number): number => {
  const day = new Date(time);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
};

const nearDay = (days: number, strings: DateStrings): string | undefined => {
  if (days === 0) return strings.today;
  if (days === -1) return strings.yesterday;
  return days === 1 ? strings.tomorrow : undefined;
};

const calendarText = ({ at, now, length, strings }: DateContext): string => {
  const { locale } = strings;
  const days = Math.round((dayStart(at.getTime()) - dayStart(now)) / DAY_MS);
  const time = intlFormats.date(locale, CALENDAR_TIME).format(at);
  const near = nearDay(days, strings);
  if (near !== undefined) return strings.dayAt(near, time);
  const inWeek = Math.abs(days) <= CALENDAR_WEEK_DAYS;
  const day = intlFormats.date(locale, inWeek ? INTL_PRESETS.weekday[length === 'short' ? 'short' : 'medium'] : INTL_PRESETS.date[length]);
  return strings.dayAt(day.format(at), time);
};

export { calendarText };
