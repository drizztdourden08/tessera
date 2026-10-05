/* @layer renderer-components @kind logic */
import { asNumber } from './as-number';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { cleanDecimal } from './clean-decimal';
import { isInRange } from './is-in-range';
import { roundTo } from './round-to';
import { showNumber } from './show-number';
import { DOT } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { SlotKind } from './slot-kind.type';

const numberIn = (text: string): number | null => {
  const value = Number(text);
  return /\d/.test(text) && Number.isFinite(value) ? value : null;
};

const settled = (value: number, slot: PatternSlotSpec): number => roundTo(clampNumber(value, slot.min, slot.max), slot.places);

const decimalKind: SlotKind = {
  inputMode: 'decimal',
  clean: cleanDecimal,
  read: (text, slot) => {
    if (text === '') return null;
    const value = numberIn(text);
    return value !== null && isInRange(value, slot) ? value : undefined;
  },
  show: (value, slot) => showNumber(value, slot),
  edit: (value, slot) => {
    const number = asNumber(value);
    return number === null ? '' : number.toFixed(slot.places);
  },
  full: (text, slot) => text.includes(DOT) && (text.split(DOT)[1] ?? '').length >= (slot.places ?? 0),
  settle: (text, slot) => {
    const value = numberIn(text);
    return value === null ? null : settled(value, slot);
  },
  step: (value, slot, by) => {
    const number = asNumber(value);
    return number === null ? slot.min ?? 0 : settled(number + by * (slot.step ?? 1), slot);
  },
};

export { decimalKind };
