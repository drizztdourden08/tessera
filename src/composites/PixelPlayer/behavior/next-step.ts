/* @layer renderer-components @kind util */
import { BOUNCING } from '../PixelPlayer.constants';
import type { PixelPlayerLoop, PlayerState, PlayRange } from '../PixelPlayer.type';
import { freshState } from './fresh-state';

const closeCycle = (state: PlayerState, loop: PixelPlayerLoop): PlayerState | null => {
  const cycles = state.cycles + 1;
  if (loop.repeat > 0 && cycles >= loop.repeat) return { ...state, cycles, playing: false, finished: true };
  return null;
};

const wrapAtEdge = (state: PlayerState, range: PlayRange, loop: PixelPlayerLoop): PlayerState => {
  const ended = closeCycle(state, loop);
  if (ended) return ended;
  return { ...freshState(range, loop.direction, true), cycles: state.cycles + 1 };
};

const turnBack = (state: PlayerState): PlayerState => {
  const dir = state.dir === 1 ? -1 : 1;
  return { ...state, dir, index: state.index + dir };
};

const bounceAtEdge = (state: PlayerState, loop: PixelPlayerLoop): PlayerState => {
  const closingDir = loop.direction === 'pingpongReverse' ? 1 : -1;
  if (state.dir !== closingDir) return turnBack(state);
  const ended = closeCycle(state, loop);
  if (ended) return ended;
  return { ...turnBack(state), cycles: state.cycles + 1 };
};

const nextStep = (state: PlayerState, range: PlayRange, loop: PixelPlayerLoop): PlayerState => {
  if (range.to <= range.from) return { ...state, playing: false };
  const inside = state.index + state.dir;
  if (inside >= range.from && inside <= range.to) return { ...state, index: inside };
  return BOUNCING.includes(loop.direction) ? bounceAtEdge(state, loop) : wrapAtEdge(state, range, loop);
};

export { nextStep };
