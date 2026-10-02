/* @layer renderer-components @kind types */
import type { PatternSlotSpec, PatternSlotType } from './parse-pattern.type';
import type { PatternSlotValue } from '../DynamicInput.type';

type TypedSlotType = Exclude<PatternSlotType, 'choice'>;

type SlotInputMode = 'numeric' | 'decimal' | 'text';

type StepDirection = 1 | -1;

interface SlotKind {
  inputMode: SlotInputMode;
  clean: (text: string, slot: PatternSlotSpec) => string;
  read: (text: string, slot: PatternSlotSpec) => PatternSlotValue | undefined;
  show: (value: PatternSlotValue | undefined, slot: PatternSlotSpec) => string;
  edit: (value: PatternSlotValue | undefined, slot: PatternSlotSpec) => string;
  full: (text: string, slot: PatternSlotSpec) => boolean;
  settle: (text: string, slot: PatternSlotSpec) => PatternSlotValue | undefined;
  step: (value: PatternSlotValue | undefined, slot: PatternSlotSpec, by: StepDirection) => PatternSlotValue | undefined;
}

export type { SlotKind, StepDirection, TypedSlotType };
