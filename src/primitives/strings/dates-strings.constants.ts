/* @layer renderer-components @kind data */
import type { DateStrings } from '../date-format/date-format.type';

const DATE_STRINGS: DateStrings = {
  locale: undefined,
  justNow: 'Just now',
  today: 'Today',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  dayAt: (day: string, time: string) => `${day}, ${time}`,
  elapsedUnits: { second: 's', minute: 'm', hour: 'h', day: 'd' },
  elapsedLabel: (label: string, time: string) => `${label} ${time}`,
};

export { DATE_STRINGS };
