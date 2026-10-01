/* @layer renderer-components @kind util */
import { CHAR_FILTERS } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const withCase = (text: string, slot: PatternSlotSpec): string => {
  if (slot.letterCase === 'upper') return text.toUpperCase();
  return slot.letterCase === 'lower' ? text.toLowerCase() : text;
};

const cleanText = (text: string, slot: PatternSlotSpec): string => {
  const kept = withCase(text.replace(CHAR_FILTERS[slot.chars ?? 'any'], ''), slot);
  const limit = slot.length ?? slot.maxLength;
  return limit === undefined ? kept : [...kept].slice(0, limit).join('');
};

export { cleanText };
