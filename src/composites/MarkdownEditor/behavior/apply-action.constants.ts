/* @layer renderer-components @kind data */
import type { MarkdownEditorActionId } from '../MarkdownEditor.type';
import type { ActionEdit } from './apply-action.type';
import { insertCodeBlock } from './insert-code-block';
import { insertLink } from './insert-link';
import { prefixLines } from './prefix-lines';
import { wrapSelection } from './wrap-selection';

const ACTION_EDITS: Readonly<Record<MarkdownEditorActionId, ActionEdit>> = {
  bold: (text, start, end) => wrapSelection(text, start, end, '**'),
  italic: (text, start, end) => wrapSelection(text, start, end, '*'),
  code: (text, start, end) => wrapSelection(text, start, end, '`'),
  list: (text, start, end) => prefixLines(text, start, end, 'bullet'),
  numberedList: (text, start, end) => prefixLines(text, start, end, 'number'),
  link: insertLink,
  codeBlock: insertCodeBlock,
};

export { ACTION_EDITS };
