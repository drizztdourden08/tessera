/* @layer renderer-components @kind data */
import type { DateLength, DatePreset, IntlByLength, IntlPreset } from './date-format.type';

const DATE_PRESETS: readonly DatePreset[] = ['relative', 'elapsed', 'calendar', 'date', 'time', 'datetime', 'weekday', 'month', 'iso'];

const DATE_LENGTHS: readonly DateLength[] = ['short', 'medium', 'long'];

const DEFAULT_LENGTHS: Readonly<Record<DatePreset, DateLength>> = {
  relative: 'long', elapsed: 'medium', calendar: 'medium', date: 'medium', time: 'short',
  datetime: 'medium', weekday: 'medium', month: 'medium', iso: 'medium',
};

const INTL_PRESETS: Readonly<Record<IntlPreset, IntlByLength>> = {
  date: { short: { dateStyle: 'short' }, medium: { dateStyle: 'medium' }, long: { dateStyle: 'long' } },
  time: { short: { timeStyle: 'short' }, medium: { timeStyle: 'medium' }, long: { timeStyle: 'long' } },
  datetime: {
    short: { dateStyle: 'short', timeStyle: 'short' },
    medium: { dateStyle: 'medium', timeStyle: 'short' },
    long: { dateStyle: 'long', timeStyle: 'short' },
  },
  weekday: { short: { weekday: 'short' }, medium: { weekday: 'long' }, long: { weekday: 'long', month: 'long', day: 'numeric' } },
  month: { short: { month: 'short' }, medium: { month: 'long' }, long: { month: 'long', year: 'numeric' } },
};

const RELATIVE_STYLES: Readonly<Record<DateLength, Intl.RelativeTimeFormatStyle>> = { short: 'narrow', medium: 'short', long: 'long' };

const RELATIVE_UNITS: readonly (readonly [Intl.RelativeTimeFormatUnit, number])[] = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3600],
  ['minute', 60],
];

const FULL_DATE: Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'short' };

const FULL_DATE_SECONDS: Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' };

const CALENDAR_TIME: Intl.DateTimeFormatOptions = { timeStyle: 'short' };

const CALENDAR_WEEK_DAYS = 6;

const DAY_MS = 86_400_000;

export {
  CALENDAR_TIME, CALENDAR_WEEK_DAYS, DATE_LENGTHS, DATE_PRESETS, DAY_MS, DEFAULT_LENGTHS, FULL_DATE, FULL_DATE_SECONDS, INTL_PRESETS,
  RELATIVE_STYLES, RELATIVE_UNITS,
};
