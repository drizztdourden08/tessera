/* @layer renderer-components @kind logic */
import type { ClockState } from './clock-state.type';

const syncAnimations = (animations: readonly Animation[], elapsed: number, rate: number, clock: ClockState): void => {
  for (const animation of animations) {
    animation.playbackRate = clock.rate * rate;
    if (clock.playing) animation.play();
    else animation.pause();
    animation.currentTime = elapsed;
  }
};

export { syncAnimations };
