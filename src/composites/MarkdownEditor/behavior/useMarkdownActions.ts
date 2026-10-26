/* @layer renderer-components @kind hook */
import type { KeyboardEvent, RefObject } from 'react';
import type { MarkdownEditorActionId } from '../MarkdownEditor.type';
import { applyAction } from './apply-action';
import { applyToTextarea } from './apply-to-textarea';
import { shortcutAction } from './shortcut-action';
import type { MarkdownActions } from './useMarkdownActions.type';

const useMarkdownActions = (area: RefObject<HTMLTextAreaElement | null>, disabled: boolean): MarkdownActions => {
  const run = (id: MarkdownEditorActionId): void => {
    const el = area.current;
    if (!el || disabled) return;
    applyToTextarea(el, applyAction(id, el.value, el.selectionStart, el.selectionEnd));
  };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    const id = shortcutAction(event);
    if (id === null) return;
    event.preventDefault();
    run(id);
  };
  return { run, onKeyDown };
};

export { useMarkdownActions };
