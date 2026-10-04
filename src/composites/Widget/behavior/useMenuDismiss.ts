/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { MENU_SELECTOR } from '../Widget.constants';
import type { MenuDismissParams } from './useMenuDismiss.type';

const isElement = (target: EventTarget): target is Element => 'closest' in target;

const useMenuDismiss = (params: MenuDismissParams): void => {
  const { open } = params;
  const latest = useRef(params);
  latest.current = params;

  useEffect(() => {
    if (!open) return undefined;
    const view = ownerWindowOf(latest.current.triggerRef.current);
    const holds = (target: EventTarget): boolean =>
      isElement(target) && (latest.current.triggerRef.current?.contains(target) === true || target.closest(MENU_SELECTOR) !== null);
    const press = (event: PointerEvent): void => {
      if (!event.composedPath().some(holds)) latest.current.onClose();
    };
    view.document.addEventListener('pointerdown', press, true);
    return () => {
      view.document.removeEventListener('pointerdown', press, true);
    };
  }, [open]);
};

export { useMenuDismiss };
