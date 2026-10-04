/* @layer renderer-components @kind logic */
interface StageClock {
  now: () => number;
  state: () => { rate: number; playing: boolean };
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
}

/** Stage time in milliseconds: it stands still while paused and runs faster or slower with the speed. */
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
      speed = Math.max(0.05, next);
    },
  };
};

export { createStageClock };
export type { StageClock };
