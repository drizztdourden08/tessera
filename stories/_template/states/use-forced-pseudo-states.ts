/* @layer stories @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../src/primitives/dom/owner-document';
import { forcePseudoStates } from './force-pseudo-states';

const useForcedPseudoStates = (ref: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    const node = ref.current;
    if (node) forcePseudoStates(ownerDocumentOf(node));
  }, [ref]);
};

export { useForcedPseudoStates };
