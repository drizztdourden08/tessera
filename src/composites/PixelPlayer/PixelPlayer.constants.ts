/* @layer renderer-components @kind constants */
import type { IconName } from '../../primitives/Icon';
import type { PixelPlayerLoop, PlayFace } from './PixelPlayer.type';

const DEFAULT_LOOP: PixelPlayerLoop = { direction: 'forward', repeat: 0 };

const DEFAULT_SPEEDS: readonly number[] = [0.5, 1, 2];

const ALL_FRAMES = '*';

const MIN_FRAME_MS = 16;

const OUTLINE_WIDTH = 2;

const PLAY_ICONS: Readonly<Record<PlayFace, IconName>> = {
  replay: 'pixel-loop',
  pause: 'pixel-pause',
  play: 'pixel-play',
};

export { ALL_FRAMES, DEFAULT_LOOP, DEFAULT_SPEEDS, MIN_FRAME_MS, OUTLINE_WIDTH, PLAY_ICONS };
