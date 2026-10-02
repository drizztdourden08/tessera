/* @layer renderer-components @kind data */
import type { PatternSlotType } from './parse-pattern.type';
import type { SlotDefaults } from './slot-arg.type';

const TWO_DIGITS = 2;

const SLOT_DEFAULTS: Readonly<Record<PatternSlotType, SlotDefaults>> = {
  number: (spec) => ({ ...spec, step: spec.step ?? 1 }),
  decimal: (spec) => ({ ...spec, places: spec.places ?? 2, step: spec.step ?? 1 }),
  hour: (spec) => {
    const clock = spec.clock ?? 24;
    return { ...spec, clock, min: clock === 12 ? 1 : 0, max: clock === 12 ? 12 : 23, pad: TWO_DIGITS, wrap: true, step: spec.step ?? 1 };
  },
  minute: (spec) => ({ ...spec, min: 0, max: 59, pad: TWO_DIGITS, wrap: true, step: spec.step ?? 1 }),
  choice: (spec) => spec,
  text: (spec) => ({ ...spec, chars: spec.chars ?? 'any' }),
  hex: (spec) => spec,
};

export { SLOT_DEFAULTS };
