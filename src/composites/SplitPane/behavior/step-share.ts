/* @layer renderer-components @kind logic */
import type { SplitLimits, SplitState } from './split-limits.type';

const stepShare = (current: SplitState, delta: number, limits: SplitLimits): number => {
  if (current.collapsed === 'start') return delta > 0 ? limits.min : 0;
  if (current.collapsed === 'end') return delta < 0 ? limits.max : 1;
  const next = current.ratio + delta;
  if (next < limits.min && current.ratio <= limits.min) return 0;
  if (next > limits.max && current.ratio >= limits.max) return 1;
  return next;
};

export { stepShare };
