/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useEscapeLayer } from '../../../primitives/escape-stack/useEscapeLayer';

const usePaletteDismiss = (surface: RefObject<HTMLElement | null>, onClose: () => void): void => {
  const latest = useRef(onClose);
  latest.current = onClose;
  useEscapeLayer(ownerDocumentOf(null), 'popover', onClose);

  useEffect(() => {
    const doc = ownerDocumentOf(surface.current);
    const press = (event: PointerEvent): void => {
      const root = surface.current;
      if (root && !event.composedPath().includes(root)) latest.current();
    };
    doc.addEventListener('pointerdown', press, true);
    return () => doc.removeEventListener('pointerdown', press, true);
  }, [surface]);
};

export { usePaletteDismiss };
