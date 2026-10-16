/* @layer stories @kind logic */
import { MINUTE } from '../relative-time.constants';

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
let now = Date.now();

const tick = () => {
  now = Date.now();
  listeners.forEach((listener) => listener());
};

const minuteClock = {
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    now = Date.now();
    timer ??= setInterval(tick, MINUTE);
    return () => {
      listeners.delete(listener);
      if (listeners.size > 0 || timer === undefined) return;
      clearInterval(timer);
      timer = undefined;
    };
  },
  read: (): number => now,
  watchers: (): number => listeners.size,
};

export { minuteClock };
