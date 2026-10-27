/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { opensElsewhere } from './opens-elsewhere';
import { popoverReady } from './popover-ready';
import { raiseLayer } from './raise-layer';

const useTopLayer = (layer: HTMLElement | null): void => {
  useLayoutEffect(() => {
    if (!layer || !popoverReady()) return undefined;
    const doc = ownerDocumentOf(layer);
    const raise = (event: Event): void => {
      if (opensElsewhere(event, layer)) raiseLayer(layer);
    };
    raiseLayer(layer);
    doc.addEventListener('toggle', raise, true);
    return () => doc.removeEventListener('toggle', raise, true);
  }, [layer]);
};

export { useTopLayer };
