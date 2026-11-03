/* @layer renderer-components @kind logic */
import type { MarkdownEditorCounterTone } from '../MarkdownEditor.type';

const counterTone = (count: number, max: number): MarkdownEditorCounterTone => {
  if (count > max) return 'danger';
  return count === max ? 'warning' : 'muted';
};

export { counterTone };
