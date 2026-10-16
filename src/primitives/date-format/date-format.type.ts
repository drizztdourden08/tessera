/* @layer renderer-components @kind types */
type DateValue = Date | string | number;

type DatePreset = 'relative' | 'calendar' | 'date' | 'time' | 'datetime' | 'weekday' | 'month' | 'iso';

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
}

interface DateFormatOptions {
  length?: DateLength;
  locale?: string;
  now?: number;
  strings?: Partial<DateStrings>;
}

interface DateContext {
  at: Date;
  now: number;
  length: DateLength;
  strings: DateStrings;
}

export type { DateContext, DateFormat, DateFormatOptions, DateLength, DatePreset, DateStrings, DateValue, IntlByLength, IntlPreset };
