/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { RefObject } from 'react';
import { SPLIT_MIN_WIDTH } from '../MarkdownEditor.constants';
import type { MarkdownEditorLayout, MarkdownEditorMode } from '../MarkdownEditor.type';
import { previewToggle } from './preview-toggle';
import { useWideContainer } from './useWideContainer';

const useEditorMode = (rootRef: RefObject<HTMLElement | null>, layout: MarkdownEditorLayout | undefined, compact: boolean | undefined, disabled: boolean): MarkdownEditorMode => {
  const [pane, setPane] = useState<MarkdownEditorMode['pane']>('write');
  const wide = useWideContainer(rootRef, SPLIT_MIN_WIDTH);
  const small = compact === true;
  const mode = small ? 'compact' : layout ?? (wide ? 'split' : 'tabs');
  const tabbed = mode === 'tabs';
  const swapped = tabbed || small;
  return { mode, tabbed, pane, setPane, writing: !swapped || pane === 'write', previewShown: !swapped || pane === 'preview', previewDrawn: !small || pane === 'preview', toggle: small ? previewToggle(pane, setPane, disabled) : undefined };
};

export { useEditorMode };
