/* @layer renderer-components @kind types */
type DateValue = Date | string | number;

type DatePreset = 'relative' | 'elapsed' | 'calendar' | 'date' | 'time' | 'datetime' | 'weekday' | 'month' | 'iso';

type DateFormat = DatePreset | Intl.DateTimeFormatOptions;

type DateLength = 'short' | 'medium' | 'long';

type IntlPreset = 'date' | 'time' | 'datetime' | 'weekday' | 'month';

type IntlByLength = Readonly<Record<DateLength, Intl.DateTimeFormatOptions>>;

interface DateStrings {
  locale: string | undefined;
  justNow: string;
  today: string;
  yesterday: string;
  tomorrow: string;
  dayAt: (day: string, time: string) => string;
  elapsedUnits: { second: string; minute: string; hour: string; day: string };
  elapsedLabel: (label: string, time: string) => string;
}

interface DateFormatOptions {
  length?: DateLength;
  locale?: string;
  now?: number;
  label?: string;
  strings?: Partial<DateStrings>;
}

interface DateContext {
  at: Date;
  now: number;
  length: DateLength;
  strings: DateStrings;
  label: string | undefined;
}

export type { DateContext, DateFormat, DateFormatOptions, DateLength, DatePreset, DateStrings, DateValue, IntlByLength, IntlPreset };
