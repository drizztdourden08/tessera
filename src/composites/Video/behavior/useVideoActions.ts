/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { UNMUTE_VOLUME } from '../Video.constants';
import type { VideoActions } from '../Video.type';
import { hasTimeline } from './has-timeline';

const noop = () => undefined;

const useVideoActions = (video: HTMLVideoElement | null): VideoActions => useMemo(() => {
  if (!video) {
    return { togglePlay: noop, seekTo: noop, seekBy: noop, setVolume: noop, toggleMute: noop, setRate: noop, reload: noop };
  }
  const seekTo = (time: number) => {
    if (hasTimeline(video.duration)) video.currentTime = Math.min(video.duration, Math.max(0, time));
  };
  return {
    togglePlay: () => {
      if (video.paused || video.ended) video.play().catch(noop);
      else video.pause();
    },
    seekTo,
    seekBy: (delta: number) => seekTo(video.currentTime + delta),
    setVolume: (volume: number) => {
      video.volume = volume;
      video.muted = volume === 0;
    },
    toggleMute: () => {
      if (video.muted && video.volume === 0) video.volume = UNMUTE_VOLUME;
      video.muted = !video.muted;
    },
    setRate: (rate: number) => {
      video.playbackRate = rate;
    },
    reload: () => video.load(),
  };
}, [video]);

export { useVideoActions };
