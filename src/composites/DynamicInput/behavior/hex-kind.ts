/* @layer renderer-components @kind logic */
import { HEX_DIGITS, HEX_PREFIX, NON_HEX, SHORT_HEX_DIGITS } from './slot-format.constants';
import type { SlotKind } from './slot-kind.type';
import type { PatternSlotValue } from '../DynamicInput.type';

const readHex = (text: string): PatternSlotValue | undefined => {
  if (text === '') return null;
  return text.length === HEX_DIGITS ? `${HEX_PREFIX}${text}` : undefined;
};

const hexDigits = (value: PatternSlotValue | undefined): string =>
  typeof value === 'string' && value.startsWith(HEX_PREFIX) ? value.slice(1).toLowerCase() : '';

const hexKind: SlotKind = {
  inputMode: 'text',
  clean: (text) => text.toLowerCase().replace(NON_HEX, '').slice(0, HEX_DIGITS),
  read: readHex,
  show: hexDigits,
  edit: hexDigits,
  full: (text) => text.length >= HEX_DIGITS,
  settle: (text) => (text.length === SHORT_HEX_DIGITS ? readHex([...text].map((digit) => `${digit}${digit}`).join('')) : readHex(text)),
  step: (value) => value,
};

export { hexKind };
