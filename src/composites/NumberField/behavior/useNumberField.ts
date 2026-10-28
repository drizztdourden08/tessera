/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { useWheelStep } from '../../wheel-step';
import { FINE_DIVISOR, KEY_DIRECTIONS } from '../NumberField.constants';
import type { NumberFieldBehavior, NumberFieldBehaviorParams } from '../NumberField.type';
import { stepNumber } from './step-number';
import { useScrub } from './useScrub';

const useNumberField = (params: NumberFieldBehaviorParams): NumberFieldBehavior => {
  const { value, onChange, min, max, step, fineStep, ladder, scrub, wheel, locked, rootRef, onKeyDown, onBlur } = params;
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState<number | undefined>(undefined);
  const config = { step, fineStep: fineStep ?? step / FINE_DIVISOR, min, max, ladder };

  const apply = (next: number): void => {
    setDraft(undefined);
    onChange(next);
  };
  const stepBy = (direction: 1 | -1, fine: boolean): void => apply(stepNumber(value, direction, { ...config, fine }));
  useWheelStep({ refs: [rootRef], active: focused && wheel && !locked, onStep: (turn) => stepBy(turn.direction, turn.fine) });

  return {
    shown: draft ?? value,
    apply,
    stepBy,
    scrubbing: useScrub({ value, enabled: scrub && !locked, config, onChange: apply }),
    onFocus: () => setFocused(true),
    onRootBlur: () => setFocused(false),
    onType: (next) => {
      setDraft(next);
      if (Number.isFinite(next)) onChange(clampNumber(next, min, max));
    },
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      setDraft(undefined);
      onBlur?.(event);
    },
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      const direction = KEY_DIRECTIONS[event.key];
      if (event.defaultPrevented || direction === undefined || locked) return;
      event.preventDefault();
      stepBy(direction, event.shiftKey);
    },
  };
};

export { useNumberField };
