/* @layer renderer-components @kind util */
import { SETTLE_FRAMES, SETTLE_LIMIT } from '../GuidedTour.constants';
import type { SettleLoop } from './tour-internal.type';

const settleLoop = (view: Window, measure: () => boolean): SettleLoop => {
  let frame = 0;
  let calm = 0;
  let left = 0;
  const tick = (): void => {
    frame = 0;
    calm = measure() ? calm + 1 : 0;
    left -= 1;
    if (calm < SETTLE_FRAMES && left > 0) frame = view.requestAnimationFrame(tick);
  };
  return {
    kick: () => {
      calm = 0;
      left = SETTLE_LIMIT;
      if (frame === 0) frame = view.requestAnimationFrame(tick);
    },
    stop: () => {
      view.cancelAnimationFrame(frame);
      frame = 0;
      left = 0;
    },
  };
};

export { settleLoop };
