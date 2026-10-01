/* @layer renderer-components @kind util */
import { clampToRange } from './clamp-to-range';
import type { PatternSlotSpec } from './parse-pattern.type';

const wrapToRange = (value: number, slot: PatternSlotSpec): number => {
  const { min, max } = slot;
  if (min === undefined || max === undefined) return clampToRange(value, slot);
  if (value > max) return min;
  return value < min ? max : value;
};

export { wrapToRange };
