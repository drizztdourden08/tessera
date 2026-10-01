/* @layer renderer-components @kind util */
import { digitLimit } from './digit-limit';
import { isInRange } from './is-in-range';
import { MINUS } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const noRoomLeft = (value: number, slot: PatternSlotSpec): boolean => {
  const grown = value * 10;
  if (value >= 0) return slot.max !== undefined && grown > slot.max;
  return slot.min !== undefined && grown < slot.min;
};

const numberFull = (text: string, slot: PatternSlotSpec): boolean => {
  const digits = text.replace(MINUS, '');
  if (digits === '') return false;
  if (digits.length >= (slot.pad ?? digitLimit(slot))) return true;
  if (slot.pad === undefined && digits === '0') return isInRange(0, slot);
  return noRoomLeft(Number(text), slot);
};

export { numberFull };
