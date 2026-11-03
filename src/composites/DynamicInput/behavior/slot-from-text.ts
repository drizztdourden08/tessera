/* @layer renderer-components @kind logic */
import { HEX_PREFIX } from './slot-format.constants';
import { SLOT_KINDS } from './slot-kinds.constants';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternChoice, PatternSlotValue } from '../DynamicInput.type';

const choiceFrom = (text: string, options: readonly PatternChoice[]): PatternSlotValue | undefined => {
  const wanted = text.toLowerCase();
  const found = options.find((option) => option.value.toLowerCase() === wanted || (option.label ?? option.value).toLowerCase() === wanted);
  return found?.value;
};

const typedFrom = (text: string, slot: PatternSlotSpec): PatternSlotValue | undefined => {
  if (slot.type === 'choice') return undefined;
  const kind = SLOT_KINDS[slot.type];
  const body = slot.type === 'hex' && text.startsWith(HEX_PREFIX) ? text.slice(HEX_PREFIX.length) : text;
  const cleaned = kind.clean(body, slot);
  return [...cleaned].length === [...body].length ? kind.read(cleaned, slot) : undefined;
};

const slotFromText = (slot: PatternSlotSpec, raw: string, options: readonly PatternChoice[]): PatternSlotValue | undefined => {
  const text = raw.trim();
  if (text === '') return slot.optional === true ? null : undefined;
  return slot.type === 'choice' ? choiceFrom(text, options) : typedFrom(text, slot);
};

export { slotFromText };
