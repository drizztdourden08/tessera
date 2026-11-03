/* @layer renderer-components @kind util */
import type { FramePlayer, PlayFace } from '../PixelPlayer.type';

const playFace = (player: Pick<FramePlayer, 'finished' | 'playing'>): PlayFace => {
  if (player.finished) return 'replay';
  return player.playing ? 'pause' : 'play';
};

export { playFace };
