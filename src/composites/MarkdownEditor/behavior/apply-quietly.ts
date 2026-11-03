/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { applyToTextarea } from './apply-to-textarea';

const applyQuietly = (area: HTMLTextAreaElement, edit: TextEdit): void => {
  if (area.ownerDocument.activeElement === area) {
    applyToTextarea(area, edit);
    return;
  }
  area.setRangeText(edit.insert, edit.from, edit.to, 'preserve');
  area.dispatchEvent(new Event('input', { bubbles: true }));
};

export { applyQuietly };
