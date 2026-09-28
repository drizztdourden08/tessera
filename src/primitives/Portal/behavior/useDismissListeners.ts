/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { UseDismissListenersParams } from './useDismissListeners.type';

const useDismissListeners = (params: UseDismissListenersParams): void => {
  const { open, onClose, contentRef, triggerRef } = params;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        contentRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) return;
      onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose, contentRef, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handler, true);
    return () => document.removeEventListener('keydown', handler, true);
  }, [open, onClose]);
};

export { useDismissListeners };
