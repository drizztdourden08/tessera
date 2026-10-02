/* @layer renderer-components @kind util */
import type { ValueScale } from './value-rule.type';

const percentAlong = (value: number, scale: ValueScale): number => {
  const span = scale.max - scale.min;
  if (span <= 0) return 0;
  return Math.min(100, Math.max(0, ((value - scale.min) / span) * 100));
};

export { percentAlong };
