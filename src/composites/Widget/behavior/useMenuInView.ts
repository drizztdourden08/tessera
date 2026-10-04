/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useFitFallback } from '../../ControlMenu/behavior/useFitFallback';

const useMenuInView = (open: boolean, triggerRef: RefObject<HTMLElement | null>, menuClass: string): void => {
  useFitFallback(() => ownerDocumentOf(triggerRef.current).getElementsByClassName(menuClass).item(0), open);
};

export { useMenuInView };
