/* @layer renderer-components @kind logic */
import type { PopSchedulerParams } from '../sub-components/IconEffectHost.type';
import { nextPopDelay } from './next-pop-delay';

const createPopScheduler = (params: PopSchedulerParams) => {
  const { every, jitter, onBeat, random = Math.random, timers = globalThis } = params;
  let handle: unknown = null;
  let beats = 0;
  const plan = (ms: number) => {
    handle = timers.setTimeout(() => {
      beats += 1;
      onBeat(beats);
      plan(nextPopDelay(every, jitter, random()));
    }, ms);
  };
  const start = () => {
    if (handle === null) plan(Math.round(random() * every));
  };
  const stop = () => {
    if (handle !== null) timers.clearTimeout(handle as never);
    handle = null;
  };
  return { start, stop };
};

export { createPopScheduler };
