/* @layer renderer-components @kind logic */
import { LIVE_TICK_MS } from '../DateText.constants';

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
let now = Date.now();

const tick = () => {
  now = Date.now();
  listeners.forEach((listener) => listener());
};

const liveClock = {
  subscribe: (listener: () => void): (() => void) => {
    if (listeners.size === 0) now = Date.now();
    listeners.add(listener);
    timer ??= setInterval(tick, LIVE_TICK_MS);
    return () => {
      listeners.delete(listener);
      if (listeners.size > 0 || timer === undefined) return;
      clearInterval(timer);
      timer = undefined;
    };
  },
  read: (): number => {
    if (listeners.size === 0) now = Date.now();
    return now;
  },
  watchers: (): number => listeners.size,
};

export { liveClock };
