/* @layer renderer-components @kind util */
import { clampNumber } from './clamp-number';
import type { ValueScale } from './value-rule.type';

const logFraction = (value: number, scale: ValueScale): number => {
  if (scale.min <= 0 || scale.max <= scale.min) return 0;
  return Math.log(clampNumber(value, scale.min, scale.max) / scale.min) / Math.log(scale.max / scale.min);
};

export { logFraction };
