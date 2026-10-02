/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';

const isInRange = (value: number, slot: PatternSlotSpec): boolean =>
  Number.isFinite(value) && (slot.min === undefined || value >= slot.min) && (slot.max === undefined || value <= slot.max);

export { isInRange };
