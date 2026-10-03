/* @layer renderer-components @kind logic */
import type { SplitLimits, SplitState } from './split-limits.type';

const settleShare = (next: number, limits: SplitLimits, ratio: number): SplitState => {
  const collapsible = limits.snapAt > 0;
  if (collapsible && next < limits.snapAt) return { collapsed: 'start', ratio };
  if (collapsible && next > 1 - limits.snapAt) return { collapsed: 'end', ratio };
  return { collapsed: 'none', ratio: Math.min(limits.max, Math.max(limits.min, next)) };
};

export { settleShare };
