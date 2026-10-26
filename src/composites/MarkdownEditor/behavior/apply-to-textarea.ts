/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import type { CommandDocument } from './apply-to-textarea.type';

const typeInto = (area: HTMLTextAreaElement, insert: string): boolean => {
  const commands: CommandDocument = area.ownerDocument;
  if (typeof commands.execCommand !== 'function') return false;
  return insert === '' ? commands.execCommand('delete') : commands.execCommand('insertText', false, insert);
};

const applyToTextarea = (area: HTMLTextAreaElement, edit: TextEdit): void => {
  area.focus();
  area.setSelectionRange(edit.from, edit.to);
  if (!typeInto(area, edit.insert)) {
    area.setRangeText(edit.insert, edit.from, edit.to, 'end');
    area.dispatchEvent(new Event('input', { bubbles: true }));
  }
  area.setSelectionRange(edit.selectStart, edit.selectEnd);
};

export { applyToTextarea };
