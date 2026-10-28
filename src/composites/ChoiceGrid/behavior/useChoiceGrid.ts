/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CELL_INDEX_ATTRIBUTE } from '../ChoiceGrid.constants';
import { choiceCellProps } from './choice-cell-props';
import { choiceIndexOf } from './choice-index-of';
import type { ChoiceEntry } from './choice-layout.type';
import { choiceTabStop } from './choice-tab-stop';
import { nextChoiceIndex } from './next-choice-index';
import type { ChoiceGridControl, ChoiceGridInput } from './useChoiceGrid.type';
import { usePickOnRelease } from './usePickOnRelease';

const useChoiceGrid = <T extends string>(input: ChoiceGridInput<T>): ChoiceGridControl => {
  const { groups, value, columns, role, pickOnRelease, onChange } = input;
  const rootRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const entries = groups.flatMap((group) => group.entries);
  const selectedIndex = entries.findIndex((entry) => entry.cell.value === value);
  const stop = choiceTabStop(entries, focused, selectedIndex);

  const pick = useCallback((index: number) => {
    const entry = entries[index];
    if (entry && entry.cell.disabled !== true) onChange(entry.cell.value);
  }, [entries, onChange]);

  usePickOnRelease(rootRef, pickOnRelease, pick);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const current = choiceIndexOf(event.target);
    const next = current === null ? null : nextChoiceIndex(event.key, current, groups, columns);
    if (current === null || next === null) return;
    event.preventDefault();
    setFocused(next);
    rootRef.current?.querySelector<HTMLElement>(`[${CELL_INDEX_ATTRIBUTE}="${next}"]`)?.focus();
    if (role === 'radiogroup' && next !== current) pick(next);
  };

  return {
    rootRef,
    onKeyDown,
    selected: (entry: ChoiceEntry) => entry.index === selectedIndex,
    cellProps: (entry: ChoiceEntry) => choiceCellProps({
      entry, role, pickOnRelease, pick, focus: setFocused,
      selected: entry.index === selectedIndex,
      stop: entry.index === stop,
    }),
  };
};

export { useChoiceGrid };
