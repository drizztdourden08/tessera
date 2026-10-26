/* @layer renderer-components @kind hook */
import { useCallback, useSyncExternalStore } from 'react';
import { asDate } from '../../../primitives/date-format/as-date';
import { formatDate } from '../../../primitives/date-format/format-date';
import { LIVE_PRESETS } from '../DateText.constants';
import { elapsedClock } from './elapsed-clock';
import { liveClock } from './live-clock';
import type { DateFormat, DateFormatOptions, DateValue } from '../../../primitives/date-format/date-format.type';

const still = (): (() => void) => () => undefined;

const useDateText = (value: DateValue, format: DateFormat, options: DateFormatOptions): string => {
  const elapsed = format === 'elapsed';
  const at = asDate(value)?.getTime();
  const ticking = useCallback((listener: () => void) => (at === undefined ? still() : elapsedClock.subscribe(listener, at)), [at]);
  const live = typeof format === 'string' && LIVE_PRESETS.has(format);
  const subscribe = live ? liveClock.subscribe : still;
  const clock = elapsed ? elapsedClock : liveClock;
  const read = () => formatDate(value, format, { ...options, now: clock.read() });
  return useSyncExternalStore(elapsed ? ticking : subscribe, read, read);
};

export { useDateText };
