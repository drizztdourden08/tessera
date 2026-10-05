/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { inertOutside } from './inert-outside';

const useTourInert = (root: HTMLElement | null, reachable: readonly HTMLElement[]): void => {
  useLayoutEffect(() => {
    if (!root) return undefined;
    return inertOutside([root, ...reachable], ownerDocumentOf(root).body);
  }, [root, reachable]);
};

export { useTourInert };
