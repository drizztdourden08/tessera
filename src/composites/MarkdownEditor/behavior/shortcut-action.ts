/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import { MARKDOWN_EDITOR_ACTIONS } from '../MarkdownEditor.constants';
import type { MarkdownEditorActionId } from '../MarkdownEditor.type';

const shortcutAction = (event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey'>): MarkdownEditorActionId | null => {
  if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return null;
  const key = event.key.toUpperCase();
  return MARKDOWN_EDITOR_ACTIONS.find((spec) => spec.key === key)?.id ?? null;
};

export { shortcutAction };
