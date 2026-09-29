/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import { INITIAL_MEDIA, MEDIA_EVENTS } from '../Video.constants';
import type { MediaSnapshot } from '../Video.type';
import { isLastSource } from './is-last-source';
import { readMediaState } from './read-media-state';

const useMediaState = (video: HTMLVideoElement | null): MediaSnapshot => {
  const [snapshot, setSnapshot] = useState<MediaSnapshot>(INITIAL_MEDIA);

  useEffect(() => {
    if (!video) return undefined;
    let sourceFailed = false;
    const update = (event?: Event) => {
      if (event?.type === 'loadstart') sourceFailed = false;
      if (event?.type === 'error' && isLastSource(video, event.target)) sourceFailed = true;
      setSnapshot(readMediaState(video, sourceFailed));
    };
    update();
    MEDIA_EVENTS.forEach((name) => video.addEventListener(name, update, true));
    return () => MEDIA_EVENTS.forEach((name) => video.removeEventListener(name, update, true));
  }, [video]);

  return snapshot;
};

export { useMediaState };
