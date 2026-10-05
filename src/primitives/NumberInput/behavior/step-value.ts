/* @layer renderer-components @kind util */
import type { StepBounds } from '../NumberInput.type';
import { toNumber } from './to-number';

const stepValue = (value: unknown, dir: 1 | -1, bounds: StepBounds): number => {
  const stepN = toNumber(bounds.step) ?? 1;
  const minN = toNumber(bounds.min);
  const maxN = toNumber(bounds.max);
  let next = (toNumber(value) ?? minN ?? 0) + dir * stepN;
  if (minN !== undefined && next < minN) next = minN;
  if (maxN !== undefined && next > maxN) next = maxN;
  return Number(next.toFixed(6));
};

export { stepValue };
