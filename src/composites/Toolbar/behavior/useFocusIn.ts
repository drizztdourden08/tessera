/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { PANEL_FOCUSABLE } from '../Toolbar.constants';

const useFocusIn = (panelRef: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    const panel = panelRef.current;
    if (panel === null) return;
    (panel.querySelector<HTMLElement>(PANEL_FOCUSABLE) ?? panel).focus();
  }, [panelRef]);
};

export { useFocusIn };
