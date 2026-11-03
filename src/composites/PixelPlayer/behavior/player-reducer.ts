/* @layer renderer-components @kind logic */
import type { PlayerAction, PlayerState, PlayRange } from '../PixelPlayer.type';
import { freshState } from './fresh-state';
import { nextStep } from './next-step';

const wrapIndex = (index: number, range: PlayRange): number => {
  const length = range.to - range.from + 1;
  return range.from + ((((index - range.from) % length) + length) % length);
};

const stopped = (state: PlayerState, index: number): PlayerState => ({ ...state, index, playing: false, finished: false, cycles: 0 });

const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'play':
      return state.finished ? freshState(action.range, action.loop.direction, true) : { ...state, playing: true };
    case 'pause':
      return { ...state, playing: false };
    case 'advance':
      return nextStep(state, action.range, action.loop);
    case 'step':
      return stopped(state, wrapIndex(state.index + action.delta, action.range));
    case 'jump':
      return stopped(state, action.to === 'first' ? action.range.from : action.range.to);
    case 'restart':
      return freshState(action.range, action.loop.direction, state.playing);
  }
};

export { playerReducer };
