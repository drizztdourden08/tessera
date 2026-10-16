/* @layer stories @kind types */
type RelativeTimeFormat = 'long' | 'short' | 'narrow';

interface RelativeTimeStrings {
  locale?: string;
  justNow: string;
  full: Intl.DateTimeFormatOptions;
}

interface RelativeTimeProps {
  value: Date | number;
  format?: RelativeTimeFormat;
  strings?: Partial<RelativeTimeStrings>;
  focusable?: boolean;
  className?: string;
}

interface RelativeTimeText {
  text: string;
  full: string;
  iso: string;
}

export type { RelativeTimeProps, RelativeTimeStrings, RelativeTimeFormat, RelativeTimeText };
