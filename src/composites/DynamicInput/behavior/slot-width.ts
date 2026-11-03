/* @layer renderer-components @kind util */
import { digitLimit } from './digit-limit';
import { NUMBER_TYPES } from './slot-width.constants';
import { HEX_DIGITS, HEX_PREFIX, MINUS } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const slotWidth = (slot: PatternSlotSpec, first: string): number => {
  if (slot.type === 'text') return slot.length ?? slot.maxLength ?? Number.POSITIVE_INFINITY;
  if (slot.type === 'hex') return HEX_DIGITS + (first === HEX_PREFIX ? HEX_PREFIX.length : 0);
  if (!NUMBER_TYPES.has(slot.type)) return Number.POSITIVE_INFINITY;
  return (slot.pad ?? digitLimit(slot)) + (first === MINUS ? MINUS.length : 0);
};

export { slotWidth };
