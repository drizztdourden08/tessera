/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { currentLine } from './current-line';
import { TASK_START } from './normalize-task.constants';

const normalizeTask = (text: string, start: number, end: number): TextEdit | null => {
  if (start !== end) return null;
  const { from } = currentLine(text, start);
  const typed = text.slice(from, start);
  const found = TASK_START.exec(typed);
  if (!found || typed === `${found[1]}${found[2]} [ ]`) return null;
  const insert = `${found[1]}${found[2]} [ ] `;
  return { from, to: start, insert, selectStart: from + insert.length, selectEnd: from + insert.length };
};

export { normalizeTask };
