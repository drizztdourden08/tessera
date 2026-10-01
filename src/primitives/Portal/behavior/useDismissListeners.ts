/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { ownerDocumentOf } from '../../dom/owner-document';
import type { UseDismissListenersParams } from './useDismissListeners.type';

const useDismissListeners = (params: UseDismissListenersParams): void => {
  const { open, onClose, contentRef, triggerRef, escape = true } = params;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const path = e.composedPath();
      if (
        contentRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node) ||
        path.some((node) => node === contentRef.current || node === triggerRef.current)
      ) return;
      onClose();
    };
    const doc = ownerDocumentOf(triggerRef.current ?? contentRef.current);
    doc.addEventListener('mousedown', handler);
    return () => doc.removeEventListener('mousedown', handler);
  }, [open, onClose, contentRef, triggerRef]);

  useEffect(() => {
    if (!open || !escape) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    const doc = ownerDocumentOf(triggerRef.current ?? contentRef.current);
    doc.addEventListener('keydown', handler, true);
    return () => doc.removeEventListener('keydown', handler, true);
  }, [open, escape, onClose, contentRef, triggerRef]);
};

export { useDismissListeners };
