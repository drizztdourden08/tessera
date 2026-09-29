/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { ownerDocumentOf } from '../../dom/owner-document';
import { PIP_EVENTS } from '../Video.constants';
import type { ScreenMode } from '../Video.type';

const usePictureInPicture = (video: HTMLVideoElement | null): ScreenMode => {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!video) return undefined;
    const doc = ownerDocumentOf(video);
    setSupported(doc.pictureInPictureEnabled === true && !video.disablePictureInPicture);
    const sync = () => setActive(doc.pictureInPictureElement === video);
    PIP_EVENTS.forEach((name) => video.addEventListener(name, sync));
    return () => PIP_EVENTS.forEach((name) => video.removeEventListener(name, sync));
  }, [video]);

  const toggle = useCallback(() => {
    if (!video) return;
    const doc = ownerDocumentOf(video);
    const request = doc.pictureInPictureElement === video ? doc.exitPictureInPicture() : video.requestPictureInPicture();
    request.catch(() => undefined);
  }, [video]);

  return { active, supported, toggle };
};

export { usePictureInPicture };
