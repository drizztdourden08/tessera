/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternField } from './pattern-field.type';

const typeLabel = (slot: PatternSlotSpec, field: PatternField): string | undefined => {
  if (slot.type === 'hour') return field.strings.hour;
  return slot.type === 'minute' ? field.strings.minute : undefined;
};

const slotLabel = (slot: PatternSlotSpec, field: PatternField): string =>
  field.setup.slots?.[slot.name]?.label ?? slot.label ?? typeLabel(slot, field) ?? slot.name;

export { slotLabel };
