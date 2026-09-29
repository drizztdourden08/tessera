/* @layer renderer-components @kind data */
import type { MediaSnapshot, VideoKeyBinding } from './Video.type';

const INITIAL_MEDIA: MediaSnapshot = {
  paused: true,
  ended: false,
  started: false,
  waiting: false,
  failed: false,
  currentTime: 0,
  duration: Number.NaN,
  buffered: 0,
  volume: 1,
  muted: false,
  rate: 1,
};

const MEDIA_EVENTS = [
  'loadstart',
  'loadedmetadata',
  'loadeddata',
  'durationchange',
  'canplay',
  'play',
  'playing',
  'pause',
  'waiting',
  'seeking',
  'seeked',
  'timeupdate',
  'progress',
  'volumechange',
  'ratechange',
  'ended',
  'emptied',
  'error',
] as const;

const FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange'] as const;

const PIP_EVENTS = ['enterpictureinpicture', 'leavepictureinpicture'] as const;

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

const SEEK_STEP = 5;

const SEEK_PAGE_STEP = 10;

const VOLUME_STEP = 0.05;

const UNMUTE_VOLUME = 0.5;

const IDLE_MS = 2500;

const VIDEO_KEYS: Readonly<Record<string, VideoKeyBinding>> = {
  ' ': { action: 'toggle', frameOnly: true },
  k: { action: 'toggle', frameOnly: false },
  arrowleft: { action: 'back', frameOnly: true },
  arrowright: { action: 'forward', frameOnly: true },
  m: { action: 'mute', frameOnly: false },
  f: { action: 'fullscreen', frameOnly: false },
  t: { action: 'theater', frameOnly: false },
};

const KEY_SHORTCUTS = 'Space K M F T ArrowLeft ArrowRight';

const SEEK_KEY_DELTAS: Readonly<Record<string, number>> = {
  ArrowLeft: -SEEK_STEP,
  ArrowDown: -SEEK_STEP,
  ArrowRight: SEEK_STEP,
  ArrowUp: SEEK_STEP,
  PageDown: -SEEK_PAGE_STEP,
  PageUp: SEEK_PAGE_STEP,
};

const MENU_KEY_STEPS: Readonly<Record<string, number>> = {
  ArrowDown: 1,
  ArrowUp: -1,
};

const DEFAULT_ERROR_MESSAGE = 'This video could not be loaded.';

export {
  DEFAULT_ERROR_MESSAGE,
  FULLSCREEN_EVENTS,
  IDLE_MS,
  INITIAL_MEDIA,
  KEY_SHORTCUTS,
  MEDIA_EVENTS,
  MENU_KEY_STEPS,
  PIP_EVENTS,
  PLAYBACK_RATES,
  SEEK_KEY_DELTAS,
  SEEK_STEP,
  UNMUTE_VOLUME,
  VIDEO_KEYS,
  VOLUME_STEP,
};
