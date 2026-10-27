/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { MarkdownEditorActionId } from '../MarkdownEditor.type';

interface MarkdownActions {
  run: (id: MarkdownEditorActionId) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export type { MarkdownActions };
