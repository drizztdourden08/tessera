/* @layer renderer-components @kind logic */
import type { PatternValue } from '../DynamicInput.type';
import type { PatternField } from './pattern-field.type';
import type { PasteOwner } from './split-pasted.type';

const lastFilled = (field: PatternField, values: PatternValue): number => {
  const filled = field.parsed.slots.map((slot, at) => (values[slot.name] === null ? -1 : at)).filter((at) => at >= 0);
  return filled.at(-1) ?? field.parsed.slots.length - 1;
};

const writePasted = (field: PatternField, values: PatternValue, own: PasteOwner): void => {
  for (const slot of field.parsed.slots) field.setSlot(slot.name, values[slot.name] ?? null);
  const target = lastFilled(field, values);
  field.setOpen(false);
  if (target !== own.index) own.release();
  field.moveTo(target, 'end');
};

export { writePasted };
