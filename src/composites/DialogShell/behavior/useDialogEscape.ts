/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { isTopDialog } from './is-top-dialog';

const useDialogEscape = (node: HTMLElement | null, dismissable: boolean, onClose: () => void): void => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!node) return undefined;
    const doc = ownerDocumentOf(node);
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !isTopDialog(doc, node)) return;
      event.preventDefault();
      onCloseRef.current();
    };
    const swallow = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
    };
    const listener = dismissable ? close : swallow;
    doc.addEventListener('keydown', listener, !dismissable);
    return () => doc.removeEventListener('keydown', listener, !dismissable);
  }, [node, dismissable]);
};

export { useDialogEscape };
