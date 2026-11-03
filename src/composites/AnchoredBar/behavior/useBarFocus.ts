/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';

const useBarFocus = (nodeRef: RefObject<HTMLElement | null>, selector: string | undefined, ready: boolean): void => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!ready || !node || selector === undefined) return undefined;
    const before = ownerDocumentOf(node).activeElement;
    node.querySelector<HTMLElement>(selector)?.focus();
    return () => {
      if (before instanceof HTMLElement && before.isConnected) before.focus();
    };
  }, [nodeRef, selector, ready]);
};

export { useBarFocus };
