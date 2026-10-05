/* @layer renderer-components @kind util */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { PatternSlotSpec } from './parse-pattern.type';

const wrapToRange = (value: number, slot: PatternSlotSpec): number => {
  const { min, max } = slot;
  if (min === undefined || max === undefined) return clampNumber(value, slot.min, slot.max);
  if (value > max) return min;
  return value < min ? max : value;
};

export { wrapToRange };
