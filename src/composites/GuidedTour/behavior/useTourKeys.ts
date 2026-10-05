/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import type { GuidedTourApi } from '../GuidedTour.type';
import { keyContext } from './key-context';
import { tourKeyAction } from './tour-key-action';

const useTourKeys = (tour: GuidedTourApi, root: HTMLElement | null, bubble: HTMLElement | null, clickStep: boolean): void => {
  const latest = useRef({ tour, bubble, clickStep });
  latest.current = { tour, bubble, clickStep };

  useEffect(() => {
    if (!root) return undefined;
    const doc = ownerDocumentOf(root);
    const onKey = (event: KeyboardEvent): void => {
      if (event.defaultPrevented) return;
      const { tour: api, bubble: box, clickStep: click } = latest.current;
      const action = tourKeyAction(event.key, keyContext(event, box, click));
      if (!action) return;
      event.preventDefault();
      api[action]();
    };
    doc.addEventListener('keydown', onKey);
    return () => doc.removeEventListener('keydown', onKey);
  }, [root]);
};

export { useTourKeys };
