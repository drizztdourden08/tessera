/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';

const placeholderEdit = (start: number, end: number, placeholder: string): TextEdit => {
  const caret = start + placeholder.length;
  return { from: start, to: end, insert: placeholder, selectStart: caret, selectEnd: caret };
};

export { placeholderEdit };
