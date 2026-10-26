/* @layer renderer-components @kind data */
import { calendarText } from './calendar-text';
import { intlText } from './intl-text';
import { isoText } from './iso-text';
import { elapsedText } from './elapsed-text';
import { relativeText } from './relative-text';
import type { DateContext, DatePreset } from './date-format.type';

const PRESET_TEXT: Readonly<Record<DatePreset, (context: DateContext) => string>> = {
  relative: relativeText,
  elapsed: elapsedText,
  calendar: calendarText,
  iso: isoText,
  date: intlText('date'),
  time: intlText('time'),
  datetime: intlText('datetime'),
  weekday: intlText('weekday'),
  month: intlText('month'),
};

export { PRESET_TEXT };
