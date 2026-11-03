/* @layer renderer-components @kind data */
const PIXEL_PLAYER_STRINGS = {
  controls: 'Playback controls',
  stepBack: 'Step back',
  stepForward: 'Step forward',
  replay: 'Replay',
  speed: 'Speed',
  speedOption: (speed: number) => `${speed}x`,
  range: 'Frame range',
  allFrames: 'All frames',
  position: (at: number, count: number) => `${at} of ${count}`,
  zoom: (zoom: number) => `${zoom}x`,
};

export { PIXEL_PLAYER_STRINGS };
