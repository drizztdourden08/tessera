/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';

const clampToRange = (value: number, slot: PatternSlotSpec): number => {
  if (slot.min !== undefined && value < slot.min) return slot.min;
  if (slot.max !== undefined && value > slot.max) return slot.max;
  return value;
};

export { clampToRange };
