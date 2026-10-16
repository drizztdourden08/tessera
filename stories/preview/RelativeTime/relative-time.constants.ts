/* @layer stories @kind data */
import type { RelativeTimeStrings } from './RelativeTime.type';

const RELATIVE_UNITS: readonly (readonly [Intl.RelativeTimeFormatUnit, number])[] = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3600],
  ['minute', 60],
];

const MINUTE = 60_000;

const TIME_STRINGS: RelativeTimeStrings = {
  justNow: 'Just now',
  full: { dateStyle: 'medium', timeStyle: 'short' },
};

export { MINUTE, RELATIVE_UNITS, TIME_STRINGS };
