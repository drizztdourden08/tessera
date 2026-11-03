/* @layer renderer-components @kind util */
import type { PixelPlayerDirection, PlayerState, PlayRange } from '../PixelPlayer.type';
import { BACKWARD_START } from '../PixelPlayer.constants';
import { startIndex } from './start-index';

const freshState = (range: PlayRange, direction: PixelPlayerDirection, playing: boolean): PlayerState => ({
  index: startIndex(range, direction),
  dir: BACKWARD_START.includes(direction) ? -1 : 1,
  cycles: 0,
  playing,
  finished: false,
});

export { freshState };
