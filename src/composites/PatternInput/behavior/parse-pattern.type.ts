/* @layer renderer-components @kind types */
type PatternSlotType = 'number' | 'decimal' | 'hour' | 'minute' | 'choice' | 'text' | 'hex';

type PatternSlotChars = 'any' | 'digits' | 'letters' | 'alnum';

type PatternSlotCase = 'upper' | 'lower';

type PatternSlotControl = 'slider' | 'stepper';

interface PatternSlotSpec {
  name: string;
  type: PatternSlotType;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  pad?: number;
  places?: number;
  group?: boolean;
  wrap?: boolean;
  clock?: 12 | 24;
  control?: PatternSlotControl;
  choices?: readonly string[];
  list?: string;
  flag?: boolean;
  minLength?: number;
  maxLength?: number;
  length?: number;
  chars?: PatternSlotChars;
  letterCase?: PatternSlotCase;
  fill?: boolean;
  muted?: boolean;
}

type PatternPart =
  | { kind: 'literal'; text: string }
  | { kind: 'slot'; slot: PatternSlotSpec; index: number }
  | { kind: 'echo'; name: string; field?: string }
  | { kind: 'icon'; name: string }
  | { kind: 'action'; name: string }
  | { kind: 'spacer' };

interface ParsedPattern {
  parts: readonly PatternPart[];
  slots: readonly PatternSlotSpec[];
  problems: readonly string[];
}

type SlotRead = { slot: PatternSlotSpec; problems: string[] } | { slot: null; problems: string[] };

interface ParseState {
  parts: PatternPart[];
  slots: PatternSlotSpec[];
  problems: string[];
}

export type {
  ParsedPattern, ParseState, PatternPart, PatternSlotCase, PatternSlotChars, PatternSlotControl, PatternSlotSpec, PatternSlotType,
  SlotRead,
};
