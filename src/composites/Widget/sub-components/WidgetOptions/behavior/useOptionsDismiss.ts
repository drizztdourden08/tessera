/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerWindowOf } from '../../../../../primitives/dom/owner-window';
import { useDismissListeners } from '../../../../../primitives/Portal';
import type { OptionsDismissParams } from './useOptionsDismiss.type';

const isNode = (target: EventTarget | null): target is Node => target !== null && 'nodeType' in target;

const useOptionsDismiss = (params: OptionsDismissParams): void => {
  const { panelRef, anchorRef, onClose } = params;
  useDismissListeners({ open: true, onClose, contentRef: panelRef, triggerRef: anchorRef });
  const latest = useRef(params);
  latest.current = params;

  useEffect(() => {
    const own = latest.current;
    const panel = own.panelRef.current;
    const view = ownerWindowOf(own.anchorRef.current ?? panel);
    const holds = (node: Node): boolean =>
      latest.current.panelRef.current?.contains(node) === true || latest.current.anchorRef.current?.contains(node) === true;
    const close = (): void => latest.current.onClose();
    const press = (event: PointerEvent): void => {
      if (!event.composedPath().some((target) => isNode(target) && holds(target))) close();
    };
    const leave = (event: FocusEvent): void => {
      if (isNode(event.relatedTarget) && !holds(event.relatedTarget)) close();
    };
    view.document.addEventListener('pointerdown', press, true);
    view.addEventListener('blur', close);
    panel?.addEventListener('focusout', leave);
    return () => {
      view.document.removeEventListener('pointerdown', press, true);
      view.removeEventListener('blur', close);
      panel?.removeEventListener('focusout', leave);
    };
  }, []);
};

export { useOptionsDismiss };
