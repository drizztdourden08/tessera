/* @layer renderer-components @kind util */
import { MAX_DIGITS } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const digitsOf = (bound: number | undefined): number => (bound === undefined ? MAX_DIGITS : String(Math.trunc(Math.abs(bound))).length);

const digitLimit = (slot: PatternSlotSpec): number => {
  const bounded = slot.min !== undefined && slot.max !== undefined;
  const widest = bounded ? Math.max(digitsOf(slot.min), digitsOf(slot.max)) : MAX_DIGITS;
  return Math.max(widest, slot.pad ?? 0);
};

export { digitLimit };
