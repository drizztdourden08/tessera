/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';

const useOpener = (open: boolean, nodeRef: RefObject<HTMLElement | null>): RefObject<Element | null> => {
  const openerRef = useRef<Element | null>(null);
  useLayoutEffect(() => {
    if (open) openerRef.current = ownerDocumentOf(nodeRef.current).activeElement;
  }, [open, nodeRef]);
  return openerRef;
};

export { useOpener };
