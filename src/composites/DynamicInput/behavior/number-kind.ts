/* @layer renderer-components @kind logic */
import { asNumber } from './as-number';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { digitLimit } from './digit-limit';
import { isInRange } from './is-in-range';
import { numberFull } from './number-full';
import { roundTo } from './round-to';
import { showNumber } from './show-number';
import { signedText } from './signed-text';
import { MINUS, NON_DIGITS } from './slot-format.constants';
import { wrapToRange } from './wrap-to-range';
import type { SlotKind } from './slot-kind.type';

const isBlank = (text: string): boolean => text === '' || text === MINUS;

const numberKind: SlotKind = {
  inputMode: 'numeric',
  clean: (text, slot) => signedText(text, text.replace(NON_DIGITS, '').slice(0, digitLimit(slot)), slot),
  read: (text, slot) => {
    if (text === '') return null;
    const value = Number(text);
    return text !== MINUS && isInRange(value, slot) ? value : undefined;
  },
  show: (value, slot) => showNumber(value, slot),
  edit: (value, slot) => showNumber(value, slot, false),
  full: numberFull,
  settle: (text, slot) => (isBlank(text) ? null : clampNumber(Number(text), slot.min, slot.max)),
  step: (value, slot, by) => {
    const number = asNumber(value);
    if (number === null) return slot.min ?? 0;
    const next = roundTo(number + by * (slot.step ?? 1));
    return slot.wrap === true ? wrapToRange(next, slot) : clampNumber(next, slot.min, slot.max);
  },
};

export { numberKind };
