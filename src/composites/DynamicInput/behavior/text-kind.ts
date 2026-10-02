/* @layer renderer-components @kind logic */
import { asText } from './as-text';
import { cleanText } from './clean-text';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { SlotKind } from './slot-kind.type';
import type { PatternSlotValue } from '../DynamicInput.type';

const readText = (text: string, slot: PatternSlotSpec): PatternSlotValue | undefined => {
  if (text === '') return null;
  const size = [...text].length;
  const shortest = slot.length ?? slot.minLength ?? 0;
  return size >= shortest ? text : undefined;
};

const textKind: SlotKind = {
  inputMode: 'text',
  clean: cleanText,
  read: readText,
  show: asText,
  edit: asText,
  full: (text, slot) => slot.length !== undefined && [...text].length >= slot.length,
  settle: readText,
  step: (value) => value,
};

export { textKind };
