/* @layer renderer-components @kind logic */
import { PATTERN_PROBLEMS } from './pattern-problems.constants';
import { SLOT_DEFAULTS } from './slot-defaults.constants';
import type { PatternSlotSpec, SlotRead } from './parse-pattern.type';

const checkRange = (spec: PatternSlotSpec, problems: string[]): PatternSlotSpec => {
  const { min, max } = spec;
  if (min === undefined || max === undefined || min <= max) return spec;
  problems.push(PATTERN_PROBLEMS.badRange(spec.name));
  return { ...spec, min: undefined, max: undefined };
};

const checkControl = (spec: PatternSlotSpec, problems: string[]): PatternSlotSpec => {
  if (spec.control !== 'slider' || (spec.min !== undefined && spec.max !== undefined)) return spec;
  problems.push(PATTERN_PROBLEMS.sliderNeedsRange(spec.name));
  return { ...spec, control: 'stepper' };
};

const hasNoChoices = (spec: PatternSlotSpec): boolean =>
  spec.type === 'choice' && spec.list === undefined && (spec.choices ?? []).length === 0;

const finishSlot = (spec: PatternSlotSpec, problems: string[]): SlotRead => {
  if (hasNoChoices(spec)) return { slot: null, problems: [...problems, PATTERN_PROBLEMS.noChoices(spec.name)] };
  const found = [...problems];
  const ranged = checkRange(SLOT_DEFAULTS[spec.type](spec), found);
  return { slot: checkControl(ranged, found), problems: found };
};

export { finishSlot };
