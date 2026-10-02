/* @layer renderer-components @kind util */
import { choiceOptions } from './choice-options';
import { choiceText } from './choice-text';
import { SLOT_KINDS } from './slot-kinds.constants';
import type { PatternField } from './pattern-field.type';

const echoText = (name: string, key: string | undefined, field: PatternField): string => {
  const slot = field.parsed.slots.find((known) => known.name === name);
  if (slot === undefined) return '';
  const value = field.value[name];
  if (slot.type !== 'choice') return SLOT_KINDS[slot.type].show(value, slot);
  const choice = choiceOptions(slot, field.setup.lists).find((option) => option.value === value);
  if (choice === undefined) return '';
  return key === undefined ? choiceText(choice) : choice[key] ?? '';
};

export { echoText };
