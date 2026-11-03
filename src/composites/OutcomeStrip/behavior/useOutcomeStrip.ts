/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { rovingIndex } from '../../../primitives/field-control/roving-index';
import { OUTCOME_INDEX_ATTRIBUTE, OUTCOME_KEYS } from '../OutcomeStrip.constants';
import type { OutcomeStep, OutcomeStripControl } from '../OutcomeStrip.type';
import { outcomeTabStop } from './outcome-tab-stop';

const useOutcomeStrip = (input: { steps: readonly OutcomeStep[]; enabled: boolean }): OutcomeStripControl => {
  const { steps, enabled } = input;
  const rootRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const tabStop = outcomeTabStop(steps, focused);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!enabled) return;
    const next = rovingIndex(event.key, tabStop, steps.map(() => true), OUTCOME_KEYS);
    if (next === null) return;
    event.preventDefault();
    setFocused(next);
    rootRef.current?.querySelector<HTMLElement>(`[${OUTCOME_INDEX_ATTRIBUTE}="${next}"]`)?.focus();
  };

  return { rootRef, onKeyDown, tabStop, onFocusCell: setFocused };
};

export { useOutcomeStrip };
