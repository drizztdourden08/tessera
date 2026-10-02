/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternField } from './pattern-field.type';

const slotPlaceholder = (slot: PatternSlotSpec, field: PatternField): string =>
  field.setup.slots?.[slot.name]?.placeholder ?? slot.name;

export { slotPlaceholder };
