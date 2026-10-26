/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import type { LinesEditInput } from './lines-edit.type';

const linesEdit = (input: LinesEditInput): TextEdit => {
  const { from, to, start, end, lines, changed } = input;
  const insert = changed.join('\n');
  if (start !== end) return { from, to, insert, selectStart: from, selectEnd: from + insert.length };
  const caret = Math.max(from, start + (changed[0] ?? '').length - (lines[0] ?? '').length);
  return { from, to, insert, selectStart: caret, selectEnd: caret };
};

export { linesEdit };
