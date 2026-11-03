/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { RAMP_INDEX_ATTRIBUTE } from '../RampStrip.constants';
import type { RampStripControl, RampStripInput } from '../RampStrip.type';
import { nextRampStep } from './next-ramp-step';
import { rampTabStop } from './ramp-tab-stop';

const useRampStrip = (input: RampStripInput): RampStripControl => {
  const { steps, value, onChange, onSelectionChange } = input;
  const rootRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const tabStop = rampTabStop(steps, value, focused);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (tabStop === null) return;
    const next = nextRampStep(event.key, tabStop, steps);
    if (next === null) return;
    event.preventDefault();
    setFocused(next);
    rootRef.current?.querySelector<HTMLElement>(`[${RAMP_INDEX_ATTRIBUTE}="${next}"]`)?.focus();
    if (next !== value) onChange(next);
    onSelectionChange?.(new Set([next]));
  };

  return { rootRef, onKeyDown, tabStop, onFocusStep: setFocused };
};

export { useRampStrip };
