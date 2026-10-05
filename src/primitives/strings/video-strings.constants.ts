/* @layer renderer-components @kind data */
const VIDEO_STRINGS = {
  playerLabel: 'Video player',
  errorMessage: 'This video could not be loaded.',
  replay: 'Replay',
  playbackSpeed: 'Playback speed',
  playbackSpeedAt: (rate: string) => `Playback speed ${rate}`,
  pictureInPicture: 'Picture in picture',
  exitPictureInPicture: 'Exit picture in picture',
  theaterMode: 'Theater mode',
  exitTheaterMode: 'Exit theater mode',
  fullScreen: 'Full screen',
  exitFullScreen: 'Exit full screen',
  seek: 'Seek',
  timeOf: (current: string, total: string) => `${current} of ${total}`,
};

export { VIDEO_STRINGS };
