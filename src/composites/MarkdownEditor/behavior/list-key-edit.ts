/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { clearEmptyItem } from './clear-empty-item';
import { continueList } from './continue-list';
import type { ListKeyEvent } from './list-line.type';
import { normalizeTask } from './normalize-task';
import { shiftListLines } from './shift-list-lines';

const listKeyEdit = (event: ListKeyEvent, text: string, start: number, end: number): TextEdit | null => {
  if (event.ctrlKey || event.metaKey || event.altKey) return null;
  if (event.key === 'Enter' && !event.shiftKey) return continueList(text, start, end);
  if (event.key === 'Backspace' && !event.shiftKey) return clearEmptyItem(text, start, end);
  if (event.key === 'Tab') return shiftListLines(text, start, end, event.shiftKey);
  if (event.key === ' ' && !event.shiftKey) return normalizeTask(text, start, end);
  return null;
};

export { listKeyEdit };
