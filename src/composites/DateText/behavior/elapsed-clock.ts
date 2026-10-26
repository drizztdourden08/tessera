/* @layer renderer-components @kind logic */
import { elapsedDue } from './elapsed-due';
import type { ElapsedWatcher } from './elapsed-clock.type';

const watchers = new Set<ElapsedWatcher>();
let timer: ReturnType<typeof setTimeout> | undefined;
let now = Date.now();

const hidden = (): boolean => typeof document !== 'undefined' && document.visibilityState === 'hidden';

const stop = () => {
  if (timer === undefined) return;
  clearTimeout(timer);
  timer = undefined;
};

const arm = () => {
  stop();
  if (watchers.size === 0 || hidden()) return;
  let next = Infinity;
  watchers.forEach((watcher) => {
    next = Math.min(next, watcher.due);
  });
  timer = setTimeout(tick, Math.max(next - Date.now(), 0));
};

const tick = () => {
  timer = undefined;
  now = Date.now();
  [...watchers].forEach((watcher) => {
    if (watcher.due > now) return;
    watcher.due = elapsedDue(watcher.at, now);
    watcher.listener();
  });
  arm();
};

const show = () => {
  if (hidden()) return stop();
  now = Date.now();
  watchers.forEach((watcher) => {
    watcher.due = elapsedDue(watcher.at, now);
    watcher.listener();
  });
  arm();
};

const elapsedClock = {
  subscribe: (listener: () => void, at: number): (() => void) => {
    if (watchers.size === 0) {
      now = Date.now();
      if (typeof document !== 'undefined') document.addEventListener('visibilitychange', show);
    }
    const watcher: ElapsedWatcher = { listener, at, due: elapsedDue(at, Date.now()) };
    watchers.add(watcher);
    arm();
    return () => {
      watchers.delete(watcher);
      if (watchers.size > 0) return arm();
      stop();
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', show);
    };
  },
  read: (): number => {
    if (watchers.size === 0) now = Date.now();
    return now;
  },
  watchers: (): number => watchers.size,
};

export { elapsedClock };
