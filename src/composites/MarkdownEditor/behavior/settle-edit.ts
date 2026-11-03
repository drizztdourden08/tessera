/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { caretAfter } from './caret-after';

const settleEdit = (text: string, placeholder: string, markdown: string, caret: number): TextEdit | null => {
  const at = text.indexOf(placeholder);
  if (at < 0) return null;
  const next = caretAfter(caret, at, placeholder.length, markdown.length);
  return { from: at, to: at + placeholder.length, insert: markdown, selectStart: next, selectEnd: next };
};

export { settleEdit };
