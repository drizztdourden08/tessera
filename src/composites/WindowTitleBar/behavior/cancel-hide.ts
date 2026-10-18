/* @layer renderer-components @kind logic */
import type { HideTimer } from './hide-timer.type';

const cancelHide = (timer: HideTimer): void => {
  if (timer.current === undefined) return;
  clearTimeout(timer.current);
  timer.current = undefined;
};

export { cancelHide };
