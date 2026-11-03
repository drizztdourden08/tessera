/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';

const placeholderEdit = (start: number, end: number, placeholder: string): TextEdit => {
  const caret = start + placeholder.length;
  return { from: start, to: end, insert: placeholder, selectStart: caret, selectEnd: caret };
};

const caretAfter = (caret: number, at: number, oldLength: number, newLength: number): number => {
  if (caret >= at + oldLength) return caret + newLength - oldLength;
  return caret > at ? at + newLength : caret;
};

const settleEdit = (text: string, placeholder: string, markdown: string, caret: number): TextEdit | null => {
  const at = text.indexOf(placeholder);
  if (at < 0) return null;
  const next = caretAfter(caret, at, placeholder.length, markdown.length);
  return { from: at, to: at + placeholder.length, insert: markdown, selectStart: next, selectEnd: next };
};

export { placeholderEdit, settleEdit };
