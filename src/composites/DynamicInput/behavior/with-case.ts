/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';

const withCase = (text: string, slot: PatternSlotSpec): string => {
  if (slot.letterCase === 'upper') return text.toUpperCase();
  return slot.letterCase === 'lower' ? text.toLowerCase() : text;
};

export { withCase };
