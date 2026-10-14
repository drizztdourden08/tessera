/* @layer stories @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../../src/primitives/dom/owner-document';
import type { ZoomState } from '../MediaViewer.type';
import { viewerKey } from './viewer-key';

const useViewerKeys = (ref: RefObject<HTMLElement | null>, open: boolean, zoom: ZoomState, step: (by: number) => void): void => {
  const latest = useRef({ zoom, step });
  useEffect(() => { latest.current = { zoom, step }; });
  useEffect(() => {
    if (!open) return undefined;
    const doc = ownerDocumentOf(ref.current);
    const onKey = (event: KeyboardEvent) => viewerKey(event, latest.current.zoom, latest.current.step);
    doc.addEventListener('keydown', onKey);
    return () => doc.removeEventListener('keydown', onKey);
  }, [ref, open]);
};

export { useViewerKeys };
