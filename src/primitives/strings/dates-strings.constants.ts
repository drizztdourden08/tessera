/* @layer renderer-components @kind data */
import type { DateStrings } from '../date-format/date-format.type';

const DATE_STRINGS: DateStrings = {
  locale: undefined,
  justNow: 'Just now',
  today: 'Today',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  dayAt: (day: string, time: string) => `${day}, ${time}`,
};

export { DATE_STRINGS };
