/* @layer renderer-components @kind util */
import type { StepBounds } from '../NumberInput.type';
import { clampNumber } from '../../value-rule/clamp-number';
import { toNumber } from './to-number';

const stepValue = (value: unknown, dir: 1 | -1, bounds: StepBounds): number => {
  const stepN = toNumber(bounds.step) ?? 1;
  const minN = toNumber(bounds.min);
  const maxN = toNumber(bounds.max);
  const next = clampNumber((toNumber(value) ?? minN ?? 0) + dir * stepN, minN, maxN);
  return Number(next.toFixed(6));
};

export { stepValue };
