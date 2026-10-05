/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { isNode } from '../../../primitives/Portal/behavior/is-node';

const useClickAdvance = (target: HTMLElement | null, next: () => void): void => {
  const latest = useRef(next);
  latest.current = next;

  useEffect(() => {
    if (!target) return undefined;
    const doc = ownerDocumentOf(target);
    const onClick = (event: MouseEvent): void => {
      if (event.target && isNode(event.target) && target.contains(event.target)) latest.current();
    };
    doc.addEventListener('click', onClick);
    return () => doc.removeEventListener('click', onClick);
  }, [target]);
};

export { useClickAdvance };
