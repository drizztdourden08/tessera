/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { inertOutside } from './inert-outside';

const useTourInert = (root: HTMLElement | null, open: HTMLElement | null): void => {
  useLayoutEffect(() => {
    if (!root) return undefined;
    return inertOutside(open ? [root, open] : [root], ownerDocumentOf(root).body);
  }, [root, open]);
};

export { useTourInert };
