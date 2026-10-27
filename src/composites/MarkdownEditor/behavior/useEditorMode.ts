/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { RefObject } from 'react';
import { SPLIT_MIN_WIDTH } from '../MarkdownEditor.constants';
import type { MarkdownEditorLayout, MarkdownEditorMode } from '../MarkdownEditor.type';
import { useWideContainer } from './useWideContainer';

const useEditorMode = (rootRef: RefObject<HTMLElement | null>, layout: MarkdownEditorLayout | undefined): MarkdownEditorMode => {
  const [pane, setPane] = useState<MarkdownEditorMode['pane']>('write');
  const wide = useWideContainer(rootRef, SPLIT_MIN_WIDTH);
  const mode = layout ?? (wide ? 'split' : 'tabs');
  const tabbed = mode === 'tabs';
  return { mode, tabbed, pane, setPane, writing: !tabbed || pane === 'write' };
};

export { useEditorMode };
