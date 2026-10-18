/* @layer renderer-components @kind logic */
import { PEEK_HIDE_MS } from '../WindowTitleBar.constants';
import type { HideTimer } from './hide-timer.type';

const scheduleHide = (timer: HideTimer, setPeeking: (peeking: boolean) => void): void => {
  if (timer.current !== undefined) return;
  timer.current = setTimeout(() => {
    timer.current = undefined;
    setPeeking(false);
  }, PEEK_HIDE_MS);
};

export { scheduleHide };
