/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import type { GuidedTourApi } from '../GuidedTour.type';
import { keyContext } from './key-context';
import { tourKeyAction } from './tour-key-action';

const useTourKeys = (tour: GuidedTourApi, root: HTMLElement | null, bubble: HTMLElement | null, waits: boolean): void => {
  const latest = useRef({ tour, bubble, waits });
  latest.current = { tour, bubble, waits };

  useEffect(() => {
    if (!root) return undefined;
    const doc = ownerDocumentOf(root);
    const onKey = (event: KeyboardEvent): void => {
      if (event.defaultPrevented) return;
      const { tour: api, bubble: box, waits: wait } = latest.current;
      const action = tourKeyAction(event.key, keyContext(event, box, wait));
      if (!action) return;
      event.preventDefault();
      event.stopPropagation();
      api[action]();
    };
    doc.addEventListener('keydown', onKey, true);
    return () => doc.removeEventListener('keydown', onKey, true);
  }, [root]);
};

export { useTourKeys };
