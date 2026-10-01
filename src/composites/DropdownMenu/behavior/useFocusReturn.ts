/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';

const useFocusReturn = (containerRef: RefObject<HTMLElement | null>, anchorRef: RefObject<HTMLElement | null>): void => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const anchor = anchorRef.current;
    return () => {
      if (container?.contains(ownerDocumentOf(container).activeElement)) anchor?.focus();
    };
  }, [containerRef, anchorRef]);
};

export { useFocusReturn };
