/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { currentLine } from './current-line';
import { parseListLine } from './parse-list-line';

const clearEmptyItem = (text: string, start: number, end: number): TextEdit | null => {
  if (start !== end) return null;
  const { from, to, line } = currentLine(text, start);
  const item = parseListLine(line);
  if (!item || item.content.trim() !== '' || start !== to) return null;
  return { from, to, insert: '', selectStart: from, selectEnd: from };
};

export { clearEmptyItem };
