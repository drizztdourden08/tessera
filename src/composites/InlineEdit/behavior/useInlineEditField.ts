/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useNameEdit } from '../../../primitives/field-control/useNameEdit';
import type { InlineEditFieldInput, InlineEditFieldState } from '../InlineEdit.type';

const useInlineEditField = (input: InlineEditFieldInput): InlineEditFieldState => {
  const { value, validate, multiline, onCommit, onDone } = input;
  const keyed = useRef(false);
  const keep = (next: string): void => {
    if (validate?.(next) !== undefined) return;
    if (next !== value) onCommit(next);
    onDone(keyed.current);
  };
  const undo = (): void => onDone(true);
  const edit = useNameEdit({ name: value, onKeep: keep, onUndo: undo, allowEmpty: true, multiline });
  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    keyed.current = event.key === 'Enter' || event.key === 'Escape';
    edit.onKeyDown(event);
  };
  const setDraft = (draft: string): void => {
    keyed.current = false;
    edit.setDraft(draft);
  };
  return { draft: edit.draft, error: validate?.(edit.draft.trim()), setDraft, onKeyDown, onBlur: edit.onBlur };
};

export { useInlineEditField };
