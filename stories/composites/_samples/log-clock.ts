/* @layer stories @kind util */
import { formatDate } from '../../../src/primitives';
import { LOG_CLOCK } from './log-clock.constants';

const logClock = (seconds: number): string => formatDate(new Date(2026, 9, 16, 0, 0, seconds), LOG_CLOCK);

export { logClock };
