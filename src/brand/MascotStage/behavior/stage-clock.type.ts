/* @layer renderer-components @kind types */
import type { ClockState } from './clock-state.type';

interface StageClock {
  now: () => number;
  state: () => ClockState;
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
}

export type { StageClock };
