/* @layer renderer-components @kind logic */
import type { MarkdownEditorActionId, TextEdit } from '../MarkdownEditor.type';
import { ACTION_EDITS } from './apply-action.constants';

const applyAction = (id: MarkdownEditorActionId, text: string, start: number, end: number): TextEdit => ACTION_EDITS[id](text, start, end);

export { applyAction };
