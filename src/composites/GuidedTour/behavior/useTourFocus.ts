/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { restoreFocus } from '../../DialogShell/behavior/restore-focus';

const useTourFocus = (root: HTMLElement | null, bubble: HTMLElement | null): void => {
  useLayoutEffect(() => {
    if (!root) return undefined;
    const doc = ownerDocumentOf(root);
    const opener = doc.activeElement;
    return () => restoreFocus(doc, root, opener);
  }, [root]);

  useLayoutEffect(() => {
    bubble?.focus({ preventScroll: true });
  }, [bubble]);
};

export { useTourFocus };
