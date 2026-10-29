/* @layer renderer-components @kind helper */
import type { MarkdownEditorLayout, MarkdownEditorMode } from '../MarkdownEditor.type';

const editorLayout = (layout: MarkdownEditorLayout | undefined, wide: boolean, small: boolean, writeOnly: boolean): MarkdownEditorMode['mode'] => {
  if (small) return 'compact';
  if (writeOnly) return 'write';
  return layout ?? (wide ? 'split' : 'tabs');
};

export { editorLayout };
