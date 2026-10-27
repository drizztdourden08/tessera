/* @layer renderer-components @kind logic */
import type { MarkdownEditorMode, MarkdownEditorPreviewToggle } from '../MarkdownEditor.type';

const previewToggle = (pane: MarkdownEditorMode['pane'], setPane: MarkdownEditorMode['setPane'], disabled: boolean): MarkdownEditorPreviewToggle => ({
  active: pane === 'preview',
  disabled,
  onToggle: () => setPane(pane === 'preview' ? 'write' : 'preview'),
});

export { previewToggle };
