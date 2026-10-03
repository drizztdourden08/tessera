/* @layer renderer-components @kind logic */
import type { SplitLimits } from './split-limits.type';

const valueRangeOf = (limits: SplitLimits): { min: number; max: number } => (
  limits.snapAt > 0
    ? { min: 0, max: 100 }
    : { min: Math.round(limits.min * 100), max: Math.round(limits.max * 100) }
);

export { valueRangeOf };
