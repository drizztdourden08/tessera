/* @layer renderer-components @kind logic */
import type { MediaSnapshot } from '../Video.type';
import { bufferedEnd } from './buffered-end';

const readMediaState = (video: HTMLVideoElement, sourceFailed: boolean): MediaSnapshot => ({
  paused: video.paused,
  ended: video.ended,
  started: !video.paused || video.played.length > 0,
  waiting: !video.paused && (video.seeking || video.readyState < video.HAVE_FUTURE_DATA),
  failed: sourceFailed || video.error !== null,
  currentTime: video.currentTime,
  duration: video.duration,
  buffered: bufferedEnd(video),
  volume: video.volume,
  muted: video.muted,
  rate: video.playbackRate,
});

export { readMediaState };
