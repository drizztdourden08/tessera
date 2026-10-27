/* @layer renderer-components @kind helper */
import type { MarkdownEditorMode } from '../MarkdownEditor.type';

const editorPanes = (pane: MarkdownEditorMode['pane'], swapped: boolean, small: boolean, writeOnly: boolean): Pick<MarkdownEditorMode, 'writing' | 'previewShown' | 'previewDrawn'> => ({
  writing: writeOnly || !swapped || pane === 'write',
  previewShown: !writeOnly && (!swapped || pane === 'preview'),
  previewDrawn: !writeOnly && (!small || pane === 'preview'),
});

export { editorPanes };
