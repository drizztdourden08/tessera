/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { RefObject } from 'react';
import { SPLIT_MIN_WIDTH } from '../MarkdownEditor.constants';
import type { MarkdownEditorMode, MarkdownEditorModeOptions } from '../MarkdownEditor.type';
import { editorLayout } from './editor-layout';
import { editorPanes } from './editor-panes';
import { previewToggle } from './preview-toggle';
import { useWideContainer } from './useWideContainer';

const useEditorMode = (rootRef: RefObject<HTMLElement | null>, options: MarkdownEditorModeOptions): MarkdownEditorMode => {
  const { layout, compact, disabled, preview = true } = options;
  const [pane, setPane] = useState<MarkdownEditorMode['pane']>('write');
  const wide = useWideContainer(rootRef, SPLIT_MIN_WIDTH);
  const small = compact === true;
  const writeOnly = !preview;
  const mode = editorLayout(layout, wide, small, writeOnly);
  const tabbed = mode === 'tabs';
  const toggle = small && !writeOnly ? previewToggle(pane, setPane, disabled) : undefined;
  return { mode, tabbed, pane, setPane, toggle, ...editorPanes(pane, tabbed || small, small, writeOnly) };
};

export { useEditorMode };
