/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { MarkdownEditorMode } from '../MarkdownEditor.type';
import { focusAtEnd } from './focus-at-end';

const useAutoFocus = (area: RefObject<HTMLTextAreaElement | null>, autoFocus: boolean, setPane: MarkdownEditorMode['setPane']): void => {
  useEffect(() => {
    if (!autoFocus) return;
    setPane('write');
    focusAtEnd(area.current);
  }, [area, autoFocus, setPane]);
};

export { useAutoFocus };
