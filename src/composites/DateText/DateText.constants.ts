/* @layer renderer-components @kind data */
import type { DatePreset } from '../../primitives/date-format/date-format.type';

const LIVE_PRESETS: ReadonlySet<DatePreset> = new Set<DatePreset>(['relative', 'calendar']);

const LIVE_TICK_MS = 10_000;

const ELAPSED_STEPS: readonly (readonly [limit: number, step: number])[] = [
  [3600, 1],
  [86_400, 60],
  [Infinity, 3600],
];

export { ELAPSED_STEPS, LIVE_PRESETS, LIVE_TICK_MS };
