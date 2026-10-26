/* @layer renderer-components @kind logic */
import type { MarkdownEditorKeyEvent, MarkdownEditorKeyIntent } from '../MarkdownEditor.type';

const editorKey = (event: MarkdownEditorKeyEvent, composing: boolean, layerOpen: boolean): MarkdownEditorKeyIntent | null => {
  if (composing) return null;
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey) return 'submit';
  if (event.key === 'Escape' && !event.defaultPrevented && !layerOpen) return 'escape';
  return null;
};

export { editorKey };
