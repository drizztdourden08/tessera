/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ANNOUNCE_DELAY_MS } from '../PixelViewport.constants';

const useZoomAnnounce = (rootRef: RefObject<HTMLElement | null>, zoom: number): string => {
  const { pixelViewport } = useTesseraStrings();
  const [said, setSaid] = useState('');
  const heard = useRef<number | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    const before = heard.current;
    heard.current = zoom;
    if (!root || before === null || before === zoom) return undefined;
    if (!root.contains(ownerDocumentOf(root).activeElement)) return undefined;
    const view = ownerWindowOf(root);
    const timer = view.setTimeout(() => setSaid(pixelViewport.zoomLevel(zoom)), ANNOUNCE_DELAY_MS);
    return () => view.clearTimeout(timer);
  }, [rootRef, zoom, pixelViewport]);
  return said;
};

export { useZoomAnnounce };
