/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { LIST_KEY_EDITS } from './list-key-edit.constants';
import type { ListKeyEvent } from './list-line.type';
import { shiftListLines } from './shift-list-lines';

const listKeyEdit = (event: ListKeyEvent, text: string, start: number, end: number): TextEdit | null => {
  if (event.ctrlKey || event.metaKey || event.altKey) return null;
  if (event.key === 'Tab') return shiftListLines(text, start, end, event.shiftKey);
  return event.shiftKey ? null : (LIST_KEY_EDITS[event.key]?.(text, start, end) ?? null);
};

export { listKeyEdit };
