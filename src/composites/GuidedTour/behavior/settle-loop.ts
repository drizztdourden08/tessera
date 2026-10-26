/* @layer renderer-components @kind util */
import { SETTLE_FRAMES, SETTLE_LIMIT, SETTLE_MS } from '../GuidedTour.constants';
import type { SettleLoop } from './tour-internal.type';

const settleLoop = (view: Window, measure: () => boolean): SettleLoop => {
  let frame = 0;
  let calm = 0;
  let left = 0;
  let start: number | null = null;
  let restless = false;
  const tick = (time?: number): void => {
    frame = 0;
    const now = time ?? performance.now();
    start ??= now;
    calm = measure() ? calm + 1 : 0;
    left -= 1;
    if (calm < SETTLE_FRAMES && left > 0 && now - start < SETTLE_MS) {
      frame = view.requestAnimationFrame(tick);
      return;
    }
    restless = calm < SETTLE_FRAMES;
    start = null;
  };
  const follow = (): void => {
    restless = false;
    calm = 0;
    if (frame !== 0) return;
    left = SETTLE_LIMIT;
    frame = view.requestAnimationFrame(tick);
  };
  return {
    kick: () => {
      if (!restless) follow();
    },
    follow,
    stop: () => {
      view.cancelAnimationFrame(frame);
      frame = 0;
      left = 0;
      start = null;
    },
  };
};

export { settleLoop };
