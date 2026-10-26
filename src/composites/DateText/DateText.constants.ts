/* @layer renderer-components @kind data */
import type { DatePreset } from '../../primitives/date-format/date-format.type';

const LIVE_PRESETS: ReadonlySet<DatePreset> = new Set<DatePreset>(['relative', 'calendar']);

const LIVE_TICK_MS = 10_000;

const ELAPSED_STEPS: readonly (readonly [limit: number, step: number])[] = [
  [3600, 1],
  [86_400, 60],
  [Infinity, 3600],
];

const ELAPSED_STEPS_ONE_UNIT: readonly (readonly [limit: number, step: number])[] = [
  [60, 1],
  [3600, 60],
  [86_400, 3600],
  [Infinity, 86_400],
];

export { ELAPSED_STEPS, ELAPSED_STEPS_ONE_UNIT, LIVE_PRESETS, LIVE_TICK_MS };
