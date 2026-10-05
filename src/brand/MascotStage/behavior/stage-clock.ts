/* @layer renderer-components @kind logic */
import { MIN_RATE } from './clip-source.constants';
import type { StageClock } from './stage-clock.type';

const createStageClock = (): StageClock => {
  let base = performance.now();
  let stored = 0;
  let playing = true;
  let speed = 1;
  const now = (): number => stored + (playing ? (performance.now() - base) * speed : 0);
  const rebase = (): void => {
    stored = now();
    base = performance.now();
  };
  return {
    now,
    state: () => ({ rate: speed, playing }),
    setPlaying: (next) => {
      rebase();
      playing = next;
    },
    setSpeed: (next) => {
      rebase();
      speed = Math.max(MIN_RATE, next);
    },
  };
};

export { createStageClock };
