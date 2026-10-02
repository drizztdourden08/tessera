/* @layer renderer-components @kind types */
import type { RefCallback, RefObject } from 'react';
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { ParsedPattern } from './parse-pattern.type';
import type { PatternSetup, PatternSlotValue, PatternValue } from '../DynamicInput.type';

type CaretPlace = 'all' | 'start' | 'end';

type PatternStrings = TesseraStrings['dynamicInput'];

interface PatternFocus {
  index: number | null;
  open: boolean;
}

interface SegmentFocus {
  caretRef: RefObject<CaretPlace | null>;
  register: (index: number) => RefCallback<HTMLElement>;
  moveTo: (index: number, place: CaretPlace) => boolean;
}

interface FocusState {
  focus: PatternFocus;
  setOpen: (open: boolean) => void;
  closeNow: () => void;
  handleFocus: (target: EventTarget) => void;
  handleBlur: (next: EventTarget | null) => void;
}

interface PatternDismissParams {
  focusState: FocusState;
  segments: SegmentFocus;
  rootRef: RefObject<HTMLElement | null>;
  popoverRef: RefObject<HTMLElement | null>;
}

interface PatternField extends SegmentFocus {
  parsed: ParsedPattern;
  value: PatternValue;
  setup: PatternSetup;
  strings: PatternStrings;
  size: ControlSize;
  disabled: boolean;
  invalid: boolean;
  describedBy: string | undefined;
  firstId: string | undefined;
  focus: PatternFocus;
  popoverRef: RefObject<HTMLDivElement | null>;
  setSlot: (name: string, next: PatternSlotValue) => void;
  setOpen: (open: boolean) => void;
  closeNow: () => void;
  dismiss: () => void;
}

interface DynamicInputState {
  field: PatternField;
  rootRef: RefObject<HTMLElement | null>;
  labelledBy: string | undefined;
  handleFocus: (target: EventTarget) => void;
  handleBlur: (next: EventTarget | null) => void;
}

export type { CaretPlace, FocusState, PatternDismissParams, PatternField, PatternFocus, DynamicInputState, SegmentFocus };
