/* @layer renderer-components @kind hook */
import type { KeyboardEvent, RefObject } from 'react';
import type { MarkdownEditorActionId } from '../MarkdownEditor.type';
import { applyAction } from './apply-action';
import { applyToTextarea } from './apply-to-textarea';
import { listKeyEdit } from './list-key-edit';
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
    if (id !== null) {
      event.preventDefault();
      run(id);
      return;
    }
    const el = area.current;
    if (!el || disabled || event.nativeEvent.isComposing) return;
    const edit = listKeyEdit(event, el.value, el.selectionStart, el.selectionEnd);
    if (edit === null) return;
    event.preventDefault();
    applyToTextarea(el, edit);
  };
  return { run, onKeyDown };
};

export { useMarkdownActions };
