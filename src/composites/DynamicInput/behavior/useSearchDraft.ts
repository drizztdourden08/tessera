/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { choiceDisplay } from './choice-display';
import { useFieldNode } from './useFieldNode';
import type { PatternChoice, PatternSlotValue } from '../DynamicInput.type';
import type { CaretPlace } from './pattern-field.type';
import type { SearchDraft, SearchEdit } from './search-choice.type';
import type { SegmentParams } from './typed-segment.type';

const useSearchDraft = (params: SegmentParams, options: readonly PatternChoice[]): SearchDraft => {
  const { field, slot, index } = params;
  const value = field.value[slot.name];
  const [edit, setEdit] = useState<SearchEdit | null>(null);
  const editRef = useRef<SearchEdit | null>(null);
  const keptRef = useRef<PatternSlotValue | undefined>(undefined);
  const seenRef = useRef(value);
  const caretRef = useRef<CaretPlace | null>(null);

  const writeEdit = useCallback((next: SearchEdit | null, caret: CaretPlace | null = null) => {
    editRef.current = next;
    if (caret !== null) caretRef.current = caret;
    setEdit(next);
  }, []);

  useLayoutEffect(() => {
    if (seenRef.current === value) return;
    seenRef.current = value;
    const shown = choiceDisplay(slot, value, options);
    const current = editRef.current;
    if (current === null || value === keptRef.current || current.text === shown) return;
    writeEdit({ text: shown, typed: false }, 'all');
  }, [value]);

  const attach = useFieldNode(field, index, caretRef);

  return { edit, editRef, keptRef, writeEdit, attach };
};

export { useSearchDraft };
