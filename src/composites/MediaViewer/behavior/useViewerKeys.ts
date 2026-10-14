/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { DIALOG_SELECTOR } from '../MediaViewer.constants';
import type { ZoomState } from '../MediaViewer.type';
import { viewerKey } from './viewer-key';

const useViewerKeys = (ref: RefObject<HTMLElement | null>, open: boolean, zoom: ZoomState | null, step: (by: number) => void): void => {
  const onKey = useEffectEvent((event: KeyboardEvent) => {
    const dialog = ref.current?.closest(DIALOG_SELECTOR);
    if (dialog?.contains(event.target as Node | null)) viewerKey(event, zoom, step);
  });
  useEffect(() => {
    if (!open) return undefined;
    const doc = ownerDocumentOf(ref.current);
    doc.addEventListener('keydown', onKey);
    return () => doc.removeEventListener('keydown', onKey);
  }, [ref, open]);
};

export { useViewerKeys };
