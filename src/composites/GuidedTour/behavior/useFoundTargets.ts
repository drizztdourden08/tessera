/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { NO_NODES } from '../GuidedTour.constants';
import type { TourSpotTarget } from '../sub-components/TourSpot.type';
import { findTarget } from './find-target';
import { sameNodes } from './same-nodes';

const useFoundTargets = (root: HTMLElement | null, targets: readonly TourSpotTarget[] | undefined, again?: unknown): readonly HTMLElement[] => {
  const [found, setFound] = useState<readonly HTMLElement[]>(NO_NODES);

  useLayoutEffect(() => {
    const doc = ownerDocumentOf(root);
    const next = root && targets ? targets.map((target) => findTarget(doc, target)).filter(isHTMLElement) : NO_NODES;
    setFound((last) => (sameNodes(last, next) ? last : next));
  }, [root, targets, again]);

  return found;
};

export { useFoundTargets };
