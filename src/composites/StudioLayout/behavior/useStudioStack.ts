/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { stackKey } from './stack-key';
import type { StudioRefs } from './studio-parts.type';
import { unstackedEditorWidth } from './unstacked-editor-width';

const useStudioStack = (refs: StudioRefs, editorMinWidth: number, panels: string): boolean => {
  const [stacked, setStacked] = useState(false);
  const { root: rootRef, body: bodyRef, editor: editorRef } = refs;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const editor = editorRef.current;
    if (!root || !body || !editor) return undefined;
    let seen = '';
    const update = () => {
      const key = stackKey(body);
      if (key === seen) return;
      seen = key;
      setStacked(unstackedEditorWidth({ root, body, editor }) < editorMinWidth);
    };
    update();
    return observeResize([body, ...body.children], update);
  }, [rootRef, bodyRef, editorRef, editorMinWidth, panels]);

  return stacked;
};

export { useStudioStack };
