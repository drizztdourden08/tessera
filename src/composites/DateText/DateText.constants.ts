/* @layer renderer-components @kind data */
import type { DatePreset } from '../../primitives/date-format/date-format.type';

const LIVE_PRESETS: ReadonlySet<DatePreset> = new Set<DatePreset>(['relative', 'calendar']);

const LIVE_TICK_MS = 10_000;

export { LIVE_PRESETS, LIVE_TICK_MS };
