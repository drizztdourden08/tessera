/* @layer renderer-components @kind hook */
import { useMemo, useRef } from 'react';
import { useFieldControl } from '../../../primitives/Field/behavior/useFieldControl';
import { useControlSize } from '../../../primitives/field-control/useControlSize';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { checkPattern } from './check-pattern';
import { parsePattern } from './parse-pattern';
import { usePatternDismiss } from './usePatternDismiss';
import { usePatternFocus } from './usePatternFocus';
import { usePatternWarnings } from './usePatternWarnings';
import { useSegmentFocus } from './useSegmentFocus';
import { useSlotValue } from './useSlotValue';
import type { DynamicInputState } from './pattern-field.type';
import type { DynamicInputProps } from '../DynamicInput.type';

const useDynamicInput = (props: DynamicInputProps): DynamicInputState => {
  const { pattern, value, onChange, slots, lists, actions, icons, counter, disabled = false, invalid, size, id } = props;
  const control = useFieldControl(id, props['aria-describedby']);
  const controlSize = useControlSize(size);
  const { dynamicInput } = useTesseraStrings();
  const setup = useMemo(() => ({ slots, lists, actions, icons, counter }), [slots, lists, actions, icons, counter]);
  const parsed = useMemo(() => parsePattern(pattern), [pattern]);
  const problems = useMemo(() => [...parsed.problems, ...checkPattern(parsed, setup)], [parsed, setup]);
  usePatternWarnings(problems);

  const rootRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const segments = useSegmentFocus();
  const focusState = usePatternFocus(rootRef, popoverRef);
  const dismiss = usePatternDismiss({ focusState, segments, rootRef, popoverRef });
  const setSlot = useSlotValue(value, onChange);
  const { focus, setOpen, closeNow, handleFocus, handleBlur } = focusState;

  const field = {
    ...segments,
    parsed, value, setup, strings: dynamicInput, size: controlSize, disabled,
    invalid: invalid ?? control.invalid ?? false,
    describedBy: control.describedBy, firstId: control.id,
    focus: disabled ? { index: null, open: false } : focus,
    popoverRef, setSlot, setOpen, closeNow, dismiss,
  };
  return { field, rootRef, labelledBy: props['aria-labelledby'] ?? control.labelId, handleFocus, handleBlur };
};

export { useDynamicInput };
