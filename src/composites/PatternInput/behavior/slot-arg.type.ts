/* @layer renderer-components @kind types */
import type { PatternSlotSpec } from './parse-pattern.type';

type SlotArgKey =
  | 'label' | 'list' | 'choices' | 'range' | 'pad' | 'step' | 'max' | 'min' | 'len' | 'places' | 'clock'
  | 'group' | 'wrap' | 'control' | 'muted' | 'flag' | 'fill' | 'chars' | 'case';

interface SlotArg {
  key: SlotArgKey;
  patch: Partial<PatternSlotSpec>;
}

type SlotDefaults = (spec: PatternSlotSpec) => PatternSlotSpec;

export type { SlotArg, SlotArgKey, SlotDefaults };
