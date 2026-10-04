/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerDocumentOf } from '../../dom/owner-document';
import { enterLayer } from './enter-layer';
import { heldAbove } from './held-above';
import { isNode } from './is-node';
import type { DismissLayer } from './dismiss-layers.type';
import type { UseDismissListenersParams } from './useDismissListeners.type';

const useDismissListeners = (params: UseDismissListenersParams): void => {
  const { open, onClose, contentRef, triggerRef, escape = true } = params;
  const latest = useRef({ onClose, contentRef, triggerRef, escape });
  latest.current = { onClose, contentRef, triggerRef, escape };

  useEffect(() => {
    if (!open) return;
    const { contentRef: content, triggerRef: trigger } = latest.current;
    const doc = ownerDocumentOf(trigger.current ?? content.current);
    const holds = (node: Node): boolean => {
      const own = latest.current;
      return own.contentRef.current?.contains(node) === true || own.triggerRef.current?.contains(node) === true;
    };
    const layer: DismissLayer = { escape: () => latest.current.escape, close: () => latest.current.onClose(), holds };
    const leave = enterLayer(doc, layer);
    const press = (event: MouseEvent): void => {
      const path = event.composedPath().filter(isNode);
      if (path.some((node) => holds(node) || heldAbove(doc, layer, node))) return;
      latest.current.onClose();
    };
    doc.addEventListener('mousedown', press);
    return () => {
      leave();
      doc.removeEventListener('mousedown', press);
    };
  }, [open]);
};

export { useDismissListeners };
