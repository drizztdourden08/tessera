/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerDocumentOf } from '../../dom/owner-document';
import { pushEscape } from '../../escape-stack/push-escape';
import { enterLayer } from './enter-layer';
import { heldAbove } from './held-above';
import { isNode } from './is-node';
import type { DismissLayer } from './dismiss-layers.type';
import type { UseDismissListenersParams } from './useDismissListeners.type';

const stayOpen = (): void => undefined;

const useDismissListeners = (params: UseDismissListenersParams): void => {
  const { open, onClose, contentRef, triggerRef, escape = true, level = 'popover' } = params;
  const latest = useRef({ onClose, contentRef, triggerRef, escape, level });
  latest.current = { onClose, contentRef, triggerRef, escape, level };

  useEffect(() => {
    if (!open) return;
    const { contentRef: content, triggerRef: trigger } = latest.current;
    const doc = ownerDocumentOf(trigger.current ?? content.current);
    const holds = (node: Node): boolean => {
      const own = latest.current;
      return own.contentRef.current?.contains(node) === true || own.triggerRef.current?.contains(node) === true;
    };
    const close = () => latest.current.onClose();
    const layer: DismissLayer = { close, holds };
    const leave = enterLayer(doc, layer);
    const leaveEscape = latest.current.escape ? pushEscape(doc, latest.current.level, close) : stayOpen;
    const press = (event: MouseEvent): void => {
      const path = event.composedPath().filter(isNode);
      if (path.some((node) => holds(node) || heldAbove(doc, layer, node))) return;
      latest.current.onClose();
    };
    doc.addEventListener('mousedown', press);
    return () => {
      leave();
      leaveEscape();
      doc.removeEventListener('mousedown', press);
    };
  }, [open]);
};

export { useDismissListeners };
