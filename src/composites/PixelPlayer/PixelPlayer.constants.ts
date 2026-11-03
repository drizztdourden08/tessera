/* @layer renderer-components @kind constants */
import type { IconName } from '../../primitives/Icon';
import type { PixelPlayerCell, PixelPlayerLoop, PixelPlayerTag, PlayerKeyAction, PlayFace } from './PixelPlayer.type';

const DEFAULT_LOOP: PixelPlayerLoop = { direction: 'forward', repeat: 0 };

const DEFAULT_SPEEDS: readonly number[] = [0.5, 1, 2];

const ALL_FRAMES = '*';

const MIN_FRAME_MS = 16;

const OUTLINE_WIDTH = 2;

const NO_TAGS: readonly PixelPlayerTag[] = [];

const NO_CELLS: readonly PixelPlayerCell[] = [];

const KEY_ACTIONS: Readonly<Record<string, PlayerKeyAction>> = {
  ' ': 'toggle',
  ArrowLeft: 'back',
  ArrowRight: 'forward',
  Home: 'first',
  End: 'last',
};

const PLAY_ICONS: Readonly<Record<PlayFace, IconName>> = {
  replay: 'pixel-loop',
  pause: 'pixel-pause',
  play: 'pixel-play',
};

export { ALL_FRAMES, DEFAULT_LOOP, DEFAULT_SPEEDS, KEY_ACTIONS, MIN_FRAME_MS, NO_CELLS, NO_TAGS, OUTLINE_WIDTH, PLAY_ICONS };
