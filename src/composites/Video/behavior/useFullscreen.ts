/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { FULLSCREEN_EVENTS, FULLSCREEN_GRACE_MS } from '../Video.constants';
import type { FullscreenMode } from '../Video.type';
import { fullscreenApi } from './fullscreen-api';

const useFullscreen = (frame: HTMLElement | null): FullscreenMode => {
  const [native, setNative] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!frame) return undefined;
    const doc = ownerDocumentOf(frame);
    const sync = () => setNative(fullscreenApi.elementOf(doc) === frame);
    FULLSCREEN_EVENTS.forEach((name) => doc.addEventListener(name, sync));
    return () => FULLSCREEN_EVENTS.forEach((name) => doc.removeEventListener(name, sync));
  }, [frame]);

  useEffect(() => {
    if (!frame || !filled) return undefined;
    const doc = ownerDocumentOf(frame);
    const leave = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilled(false);
    };
    doc.addEventListener('keydown', leave);
    return () => doc.removeEventListener('keydown', leave);
  }, [frame, filled]);

  const toggle = useCallback(() => {
    if (!frame) return;
    const doc = ownerDocumentOf(frame);
    if (filled) setFilled(false);
    else if (fullscreenApi.elementOf(doc) === frame) fullscreenApi.exit(doc).catch(() => setNative(false));
    else if (!fullscreenApi.enabledIn(doc)) setFilled(true);
    else fullscreenApi.requestWithin(frame, FULLSCREEN_GRACE_MS).catch(() => setFilled(true));
  }, [frame, filled]);

  return { active: native || filled, supported: frame !== null, filled, toggle };
};

export { useFullscreen };
