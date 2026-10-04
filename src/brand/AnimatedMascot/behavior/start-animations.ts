/* @layer renderer-components @kind logic */
import type { MotionLive } from './useMascotMotion.type';

const startAnimations = (animations: readonly Animation[], live: MotionLive): void => {
  for (const animation of animations) {
    animation.playbackRate = live.rate;
    if (!live.playing) animation.pause();
  }
};

export { startAnimations };
