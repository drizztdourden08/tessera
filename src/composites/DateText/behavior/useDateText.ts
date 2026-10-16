/* @layer renderer-components @kind hook */
import { useSyncExternalStore } from 'react';
import { formatDate } from '../../../primitives/date-format/format-date';
import { LIVE_PRESETS } from '../DateText.constants';
import { liveClock } from './live-clock';
import type { DateFormat, DateFormatOptions, DateValue } from '../../../primitives/date-format/date-format.type';

const still = (): (() => void) => () => undefined;

const useDateText = (value: DateValue, format: DateFormat, options: DateFormatOptions): string => {
  const live = typeof format === 'string' && LIVE_PRESETS.has(format);
  const read = () => formatDate(value, format, { ...options, now: liveClock.read() });
  return useSyncExternalStore(live ? liveClock.subscribe : still, read, read);
};

export { useDateText };
