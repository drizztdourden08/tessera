/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { focusMenuItem } from './focus-menu-item';
import type { MenuFocusStart } from './menu-context.type';

const useMenuFocus = (menuRef: RefObject<HTMLElement | null>, start: MenuFocusStart): void => {
  useEffect(() => {
    const menu = menuRef.current;
    if (start === 'none' || !menu) return undefined;
    const view = ownerWindowOf(menu);
    const frame = view.requestAnimationFrame(() => focusMenuItem(menu, start));
    return () => view.cancelAnimationFrame(frame);
  }, [menuRef, start]);
};

export { useMenuFocus };
