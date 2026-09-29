/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { ownerDocumentOf } from '../../dom/owner-document';
import type { ScreenMode } from '../Video.type';

const useFullscreen = (frame: HTMLElement | null): ScreenMode => {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!frame) return undefined;
    const doc = ownerDocumentOf(frame);
    setSupported(doc.fullscreenEnabled === true);
    const sync = () => setActive(doc.fullscreenElement === frame);
    doc.addEventListener('fullscreenchange', sync);
    return () => doc.removeEventListener('fullscreenchange', sync);
  }, [frame]);

  const toggle = useCallback(() => {
    if (!frame) return;
    const doc = ownerDocumentOf(frame);
    const request = doc.fullscreenElement === frame ? doc.exitFullscreen() : frame.requestFullscreen();
    request.catch(() => undefined);
  }, [frame]);

  return { active, supported, toggle };
};

export { useFullscreen };
