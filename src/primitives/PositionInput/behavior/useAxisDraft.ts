/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { SETTLED } from './draft-rules.constants';
import { displayValue } from './draft-rules';
import { resolveTyped } from './resolveTyped';
import { settleDraft } from './settleDraft';
import type { KeyboardEvent } from 'react';
import type { AxisDraftParams } from './useAxisDraft.type';

const useAxisDraft = (params: AxisDraftParams) => {
  const { value, axis, onCommit } = params;
  const [draft, setDraft] = useState<number | null>(SETTLED);

  const handleChange = useCallback(
    (typed: number): void => {
      const outcome = resolveTyped(typed, axis);
      if (outcome.kind === 'hold') {
        setDraft(outcome.draft);
        return;
      }
      setDraft(SETTLED);
      onCommit(outcome.value);
    },
    [axis, onCommit],
  );

  const handleBlur = useCallback((): void => {
    if (draft === SETTLED) return;
    setDraft(SETTLED);
    const settled = settleDraft(draft, axis, value);
    if (settled !== null) onCommit(settled);
  }, [axis, draft, onCommit, value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') handleBlur();
    },
    [handleBlur],
  );

  return { fieldValue: displayValue(draft, value), handleChange, handleBlur, handleKeyDown };
};

export { useAxisDraft };
